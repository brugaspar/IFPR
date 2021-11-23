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
class ProductsRepository {
    async store(product, requestUserId) {
        const { disabledAt, lastDisabledBy, lastUpdatedBy, createdBy, logUserId } = (0, disabled_helper_1.getDisabledInfo)(product.disabled, requestUserId);
        const { id } = await prisma.products.create({
            data: {
                ...product,
                createdBy,
                lastUpdatedBy,
                disabledAt,
                lastDisabledBy,
            },
            select: {
                id: true,
            },
        });
        await logs_repository_1.default.store("products", {
            action: "insert",
            description: "Registro incluído por usuário",
            referenceId: id,
            userId: logUserId,
        });
        return id;
    }
    async findById(id) {
        const product = await prisma.products.findUnique({
            where: {
                id,
            },
        });
        return product;
    }
    async findAll({ onlyEnabled = true, search = "" }) {
        const splittedSearch = search.split(" ");
        let searchText = "";
        splittedSearch.forEach((word, index) => {
            searchText += `
        (
          upper(unaccent(p.name)) like upper(unaccent('%${word}%'))
          or
          upper(unaccent(pg.name)) like upper(unaccent('%${word}%'))
          or
          upper(unaccent(pb.name)) like upper(unaccent('%${word}%'))
        )
      `;
            if (index !== splittedSearch.length - 1) {
                searchText += "and";
            }
        });
        let whereClause = `
      where
        ${onlyEnabled ? `p.disabled = false and` : ""}
        ${searchText}
    `;
        const pg = await pgPool.connect();
        const query = `
      select
        p.id,
        p.name,
        p.is_service,
        p.quantity,
        p.minimum_quantity,
        p.price,
        p.brand_id,
        p.group_id,
        p.disabled,
        p.disabled_at,
        p.created_at,
        p.updated_at,
        p.last_disabled_by,
        p.last_updated_by,
        p.created_by,
        (select u.name from users u where u.id = p.last_disabled_by) disabled_by_user,
        pg.name group_name,
        pb.name brand_name
      from
        products p
      left join
        products_groups pg on pg.id = p.group_id
      left join
        products_brands pb on pb.id = p.brand_id
      ${whereClause}
      order by
        p.created_at
    `;
        const products = await pg.query(query);
        await pg.release();
        if (!products) {
            return [];
        }
        const parsedProductsResult = products.rows.map((product) => {
            const disabledAt = product.disabled_at ? new Date(product.disabled_at).toISOString() : null;
            const createdAt = product.created_at ? new Date(product.created_at).toISOString() : null;
            const updatedAt = product.updated_at ? new Date(product.updated_at).toISOString() : null;
            return {
                id: product.id,
                name: product.name,
                quantity: product.quantity,
                minimum_quantity: product.minimum_quantity,
                price: product.price,
                brand: {
                    id: product.brand_id,
                    name: product.brand_name,
                },
                group: {
                    id: product.group_id,
                    name: product.group_name,
                },
                disabled: product.disabled,
                disabledAt,
                createdAt,
                updatedAt,
                lastDisabledBy: product.last_disabled_by,
                lastUpdatedBy: product.last_updated_by,
                createdBy: product.created_by,
                disabledByUser: product.disabled_by_user,
                isService: product.is_service,
            };
        });
        return parsedProductsResult;
    }
    async update({ product, requestUserId, productId }) {
        const { disabledAt, lastDisabledBy, lastUpdatedBy, logUserId } = (0, disabled_helper_1.getDisabledInfo)(product.disabled, requestUserId);
        const { id } = await prisma.products.update({
            data: {
                ...product,
                disabledAt,
                lastDisabledBy,
                lastUpdatedBy,
            },
            where: {
                id: productId,
            },
            select: {
                id: true,
            },
        });
        await logs_repository_1.default.store("products", {
            action: "update",
            description: "Registro atualizado por usuário",
            referenceId: id,
            userId: logUserId,
        });
        return id;
    }
}
exports.default = new ProductsRepository();
