"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require(".prisma/client");
const pg_1 = require("pg");
const disabled_helper_1 = require("../helpers/disabled.helper");
const logs_repository_1 = __importDefault(require("./logs.repository"));
const prisma = new client_1.PrismaClient();
const pgPool = new pg_1.Pool();
class ProductsBrandsRepository {
    async store(productBrand, requestUserId) {
        const { disabledAt, lastDisabledBy, lastUpdatedBy, createdBy, logUserId } = (0, disabled_helper_1.getDisabledInfo)(productBrand.disabled, requestUserId);
        const { id } = await prisma.productsBrands.create({
            data: {
                ...productBrand,
                createdBy,
                lastUpdatedBy,
                disabledAt,
                lastDisabledBy,
            },
            select: {
                id: true,
            },
        });
        await logs_repository_1.default.store("products_brands", {
            action: "insert",
            description: "Registro incluído por usuário",
            referenceId: id,
            userId: logUserId,
        });
        return id;
    }
    async findById(id) {
        const productBrand = await prisma.productsBrands.findUnique({
            where: {
                id,
            },
        });
        return productBrand;
    }
    async findAll({ onlyEnabled = true, search = "" }) {
        const splittedSearch = search.split(" ");
        let searchText = "";
        splittedSearch.forEach((word, index) => {
            searchText += `
        (
          upper(unaccent(pb.name)) like upper(unaccent('%${word}%'))
        )
      `;
            if (index !== splittedSearch.length - 1) {
                searchText += "and";
            }
        });
        let whereClause = `
      where
        ${onlyEnabled ? `pb.disabled = false and` : ""}
        ${searchText}
    `;
        const pg = await pgPool.connect();
        const query = `
      select
        pb.id,
        pb.name,
        pb.disabled,
        pb.disabled_at,
        pb.created_at,
        pb.updated_at,
        pb.last_disabled_by,
        pb.last_updated_by,
        pb.created_by,
        (select u.name from users u where u.id = pb.last_disabled_by) disabled_by_user
      from
        products_brands pb
      ${whereClause}
      order by
        pb.created_at
    `;
        const productsBrands = await pg.query(query);
        await pg.release();
        if (!productsBrands) {
            return [];
        }
        const parsedProductsBrandsResult = productsBrands.rows.map((product) => {
            const disabledAt = product.disabled_at ? new Date(product.disabled_at).toISOString() : null;
            const createdAt = product.created_at ? new Date(product.created_at).toISOString() : null;
            const updatedAt = product.updated_at ? new Date(product.updated_at).toISOString() : null;
            return {
                id: product.id,
                name: product.name,
                disabled: product.disabled,
                disabledAt,
                createdAt,
                updatedAt,
                lastDisabledBy: product.last_disabled_by,
                lastUpdatedBy: product.last_updated_by,
                createdBy: product.created_by,
                disabledByUser: product.disabled_by_user,
            };
        });
        return parsedProductsBrandsResult;
    }
    async update({ productBrand, requestUserId, productBrandId }) {
        const { disabledAt, lastDisabledBy, lastUpdatedBy, logUserId } = (0, disabled_helper_1.getDisabledInfo)(productBrand.disabled, requestUserId);
        const { id } = await prisma.productsBrands.update({
            data: {
                ...productBrand,
                disabledAt,
                lastDisabledBy,
                lastUpdatedBy,
            },
            where: {
                id: productBrandId,
            },
            select: {
                id: true,
            },
        });
        await logs_repository_1.default.store("products_brands", {
            action: "update",
            description: "Registro atualizado por usuário",
            referenceId: id,
            userId: logUserId,
        });
        return id;
    }
}
exports.default = new ProductsBrandsRepository();
