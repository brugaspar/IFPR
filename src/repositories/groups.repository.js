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
class ProductsGroupsRepository {
    async store(productGroup, requestUserId) {
        const { disabledAt, lastDisabledBy, lastUpdatedBy, createdBy, logUserId } = (0, disabled_helper_1.getDisabledInfo)(productGroup.disabled, requestUserId);
        const { id } = await prisma.productsGroups.create({
            data: {
                ...productGroup,
                createdBy,
                lastUpdatedBy,
                disabledAt,
                lastDisabledBy,
            },
            select: {
                id: true,
            },
        });
        await logs_repository_1.default.store("products_groups", {
            action: "insert",
            description: "Registro incluído por usuário",
            referenceId: id,
            userId: logUserId,
        });
        return id;
    }
    async findById(id) {
        const productGroup = await prisma.productsGroups.findUnique({
            where: {
                id,
            },
        });
        return productGroup;
    }
    async findAll({ onlyEnabled = true, search = "" }) {
        const splittedSearch = search.split(" ");
        let searchText = "";
        splittedSearch.forEach((word, index) => {
            searchText += `
        (
          upper(unaccent(pg.name)) like upper(unaccent('%${word}%'))
        )
      `;
            if (index !== splittedSearch.length - 1) {
                searchText += "and";
            }
        });
        let whereClause = `
      where
        ${onlyEnabled ? `pg.disabled = false and` : ""}
        ${searchText}
    `;
        const pg = await pgPool.connect();
        const query = `
      select
        pg.id,
        pg.name,
        pg.disabled,
        pg.disabled_at,
        pg.created_at,
        pg.updated_at,
        pg.last_disabled_by,
        pg.last_updated_by,
        pg.created_by,
        (select u.name from users u where u.id = pg.last_disabled_by) disabled_by_user
      from
        products_groups pg
      ${whereClause}
      order by
        pg.created_at
    `;
        const productsGroups = await pg.query(query);
        await pg.release();
        if (!productsGroups) {
            return [];
        }
        const parsedProductsBrandsResult = productsGroups.rows.map((product) => {
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
    async update({ productGroup: productBrand, requestUserId, productGroupId: productBrandId }) {
        const { disabledAt, lastDisabledBy, lastUpdatedBy, logUserId } = (0, disabled_helper_1.getDisabledInfo)(productBrand.disabled, requestUserId);
        const { id } = await prisma.productsGroups.update({
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
        await logs_repository_1.default.store("products_groups", {
            action: "update",
            description: "Registro atualizado por usuário",
            referenceId: id,
            userId: logUserId,
        });
        return id;
    }
}
exports.default = new ProductsGroupsRepository();
