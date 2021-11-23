"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require(".prisma/client");
// import { Pool } from "pg"
const pg_configuration_1 = require("../configuration/pg.configuration");
const disabled_helper_1 = require("../helpers/disabled.helper");
const logs_repository_1 = __importDefault(require("./logs.repository"));
const prisma = new client_1.PrismaClient();
// const pgPool = new Pool()
class UsersRepository {
    async store(user, requestUserId) {
        const { disabledAt, lastDisabledBy, lastUpdatedBy, createdBy, logUserId } = (0, disabled_helper_1.getDisabledInfo)(user.disabled, requestUserId);
        const { id } = await prisma.users.create({
            data: {
                ...user,
                createdBy,
                lastUpdatedBy,
                disabledAt,
                lastDisabledBy,
            },
            select: {
                id: true,
            },
        });
        await logs_repository_1.default.store("users", {
            action: "insert",
            description: "Registro incluído por usuário",
            referenceId: id,
            userId: logUserId,
        });
        return id;
    }
    async findByUsername(username) {
        const user = await prisma.users.findUnique({
            where: {
                username,
            },
        });
        return user;
    }
    async findByEmail(email) {
        const user = await prisma.users.findUnique({
            where: {
                email,
            },
        });
        return user;
    }
    async findById(id) {
        const user = await prisma.users.findUnique({
            where: {
                id,
            },
        });
        return user;
    }
    async findAll({ onlyEnabled = true, search = "" }) {
        //? Antigo SELECT, com case-sensitive e considerando acentos
        // const users = await prisma.users.findMany({
        //   where: {
        //     disabled: onlyEnabled ? false : undefined,
        //   },
        //   include: {
        //     disabledByUser: true,
        //   },
        // })
        const splittedSearch = search.split(" ");
        let searchText = "";
        splittedSearch.forEach((word, index) => {
            searchText += `
        (
          upper(unaccent(u.name)) like upper(unaccent('%${word}%'))
          or
          upper(unaccent(u.username)) like upper(unaccent('%${word}%'))
          or
          upper(unaccent(u.email)) like upper(unaccent('%${word}%'))
        )
      `;
            if (index !== splittedSearch.length - 1) {
                searchText += "and";
            }
        });
        let whereClause = `
      where
        ${onlyEnabled ? `u.disabled = false and` : ""}
        ${searchText}
    `;
        const pg = await pg_configuration_1.pgPool.connect();
        const query = `
      select
        u.id,
        u.name,
        u.username,
        u.email,
        u.permissions,
        u.disabled,
        u.disabled_at,
        u.created_at,
        u.updated_at,
        u.last_disabled_by,
        u.last_updated_by,
        u.created_by,
        (select u2.name from users u2 where u2.id = u.last_disabled_by) disabled_by_user
      from
        users u
      ${whereClause}
      order by
        u.created_at
    `;
        const users = await pg.query(query);
        await pg.release();
        if (!users) {
            return [];
        }
        const parsedUsersResult = users.rows.map((user) => {
            const disabledAt = user.disabled_at ? new Date(user.disabled_at).toISOString() : null;
            const createdAt = user.created_at ? new Date(user.created_at).toISOString() : null;
            const updatedAt = user.updated_at ? new Date(user.updated_at).toISOString() : null;
            return {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                permissions: user.permissions,
                disabled: user.disabled,
                disabledAt,
                createdAt,
                updatedAt,
                lastDisabledBy: user.last_disabled_by,
                lastUpdatedBy: user.last_updated_by,
                createdBy: user.created_by,
                disabledByUser: user.disabled_by_user,
            };
        });
        return parsedUsersResult;
    }
    async update({ user, requestUserId, userId }) {
        const { disabledAt, lastDisabledBy, lastUpdatedBy, logUserId } = (0, disabled_helper_1.getDisabledInfo)(user.disabled, requestUserId);
        const { id } = await prisma.users.update({
            data: {
                ...user,
                password: user.password || undefined,
                disabledAt,
                lastDisabledBy,
                lastUpdatedBy,
            },
            where: {
                id: userId,
            },
            select: {
                id: true,
            },
        });
        await logs_repository_1.default.store("users", {
            action: "update",
            description: "Registro atualizado por usuário",
            referenceId: id,
            userId: logUserId,
        });
        return id;
    }
}
exports.default = new UsersRepository();
