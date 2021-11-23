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
class MembersRepository {
    async store(member, requestUserId) {
        const { disabledAt, lastDisabledBy, lastUpdatedBy, createdBy, logUserId } = (0, disabled_helper_1.getDisabledInfo)(member.disabled, requestUserId);
        const { id } = await prisma.members.create({
            data: {
                ...member,
                createdBy,
                lastUpdatedBy,
                disabledAt,
                lastDisabledBy,
            },
            select: {
                id: true,
            },
        });
        await logs_repository_1.default.store("members", {
            action: "insert",
            description: "Registro incluído por usuário",
            referenceId: id,
            userId: logUserId,
        });
        return id;
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
          upper(unaccent(m.name)) like upper(unaccent('%${word}%'))
          or
          upper(unaccent(m.email)) like upper(unaccent('%${word}%'))
        )
      `;
            if (index !== splittedSearch.length - 1) {
                searchText += "and";
            }
        });
        let whereClause = `
      where
        ${onlyEnabled ? `m.disabled = false and` : ""}
        ${searchText}
    `;
        const pg = await pg_configuration_1.pgPool.connect();
        const query = `
      select
        m.id,
        m.name,
        m.rg,
        m.issuing_authority,
        m.cpf,
        m.mother_name,
        m.father_name,
        m.profession,
        m.email,
        m.phone,
        m.cell_phone,
        m.cr_number,
        m.cr_validity,
        m.health_issues,
        m.gender,
        m.marital_status,
        m.blood_typing,
        m.disabled,
        m.naturality_city_id,
        m.issued_at,
        m.birth_date,
        m.disabled_at,
        m.created_at,
        m.updated_at,
        m.last_disabled_by,
        m.last_updated_by,
        m.created_by,
        (select u.name from users u where u.id = m.last_disabled_by) disabled_by_user
      from
        members m
      ${whereClause}
      order by
        m.created_at
    `;
        const members = await pg.query(query);
        await pg.release();
        if (!members) {
            return [];
        }
        const parsedMembersResult = members.rows.map((member) => {
            const disabledAt = member.disabled_at ? new Date(member.disabled_at).toISOString() : null;
            const createdAt = member.created_at ? new Date(member.created_at).toISOString() : null;
            const updatedAt = member.updated_at ? new Date(member.updated_at).toISOString() : null;
            return {
                id: member.id,
                name: member.name,
                rg: member.rg,
                issuingAuthority: member.issuing_authority,
                cpf: member.cpf,
                motherName: member.mother_name,
                fatherName: member.father_name,
                profession: member.profession,
                email: member.email,
                phone: member.phone,
                cellPhone: member.cell_phone,
                crNumber: member.cr_number,
                crValidity: member.cr_validity,
                healthIssues: member.health_issues,
                gender: member.gender,
                maritalStatus: member.marital_status,
                bloodTyping: member.blood_typing,
                disabled: member.disabled,
                disabledAt,
                createdAt,
                updatedAt,
                lastDisabledBy: member.last_disabled_by,
                lastUpdatedBy: member.last_updated_by,
                planId: member.plan_id,
                naturalityCityId: member.naturality_city_id,
                issuedAt: member.issued_at,
                birthDate: member.birth_date,
                createdBy: member.created_by,
                disabledByUser: member.disabled_by_user,
            };
        });
        return parsedMembersResult;
    }
    async findById(id) {
        const member = await prisma.members.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                rg: true,
                issuingAuthority: true,
                cpf: true,
                motherName: true,
                fatherName: true,
                profession: true,
                email: true,
                phone: true,
                cellPhone: true,
                crNumber: true,
                crValidity: true,
                healthIssues: true,
                gender: true,
                maritalStatus: true,
                bloodTyping: true,
                disabled: true,
                disabledAt: true,
                createdAt: true,
                updatedAt: true,
                lastDisabledBy: true,
                lastUpdatedBy: true,
                planId: true,
                city: true,
                issuedAt: true,
                birthDate: true,
            },
        });
        return member;
    }
    async findByEmail(email) {
        const member = await prisma.members.findUnique({
            where: {
                email,
            },
        });
        return member;
    }
    async update({ member, requestUserId, memberId }) {
        const { disabledAt, lastDisabledBy, lastUpdatedBy, logUserId } = (0, disabled_helper_1.getDisabledInfo)(member.disabled, requestUserId);
        const { id } = await prisma.members.update({
            data: {
                ...member,
                disabledAt,
                lastDisabledBy,
                lastUpdatedBy,
            },
            where: {
                id: memberId,
            },
            select: {
                id: true,
            },
        });
        await logs_repository_1.default.store("members", {
            action: "update",
            description: "Registro atualizado por usuário",
            referenceId: id,
            userId: logUserId,
        });
        return id;
    }
    async findAllDocuments(memberId) {
        const memberDocuments = await prisma.members.findUnique({
            where: {
                id: memberId,
            },
            select: {
                memberDocuments: true,
            },
        });
        return memberDocuments;
    }
}
exports.default = new MembersRepository();
