"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require(".prisma/client");
const disabled_helper_1 = require("../helpers/disabled.helper");
const logs_repository_1 = __importDefault(require("./logs.repository"));
const prisma = new client_1.PrismaClient();
class AddressesRepository {
    async store(address, requestUserId) {
        const { lastUpdatedBy, createdBy, logUserId } = (0, disabled_helper_1.getDisabledInfo)(false, requestUserId);
        const { id } = await prisma.membersAddresses.create({
            data: {
                ...address,
                createdBy,
                lastUpdatedBy,
            },
            select: {
                id: true,
            },
        });
        await logs_repository_1.default.store("members_addresses", {
            action: "insert",
            description: "Registro incluído por usuário",
            referenceId: id,
            userId: logUserId,
        });
        return id;
    }
    async update({ address, requestUserId, addressId }) {
        const { lastUpdatedBy, logUserId } = (0, disabled_helper_1.getDisabledInfo)(false, requestUserId);
        const { id } = await prisma.membersAddresses.update({
            data: {
                ...address,
                lastUpdatedBy,
            },
            where: {
                id: addressId,
            },
            select: {
                id: true,
            },
        });
        await logs_repository_1.default.store("members_addresses", {
            action: "update",
            description: "Registro atualizado por usuário",
            referenceId: id,
            userId: logUserId,
        });
        return id;
    }
    async delete(id, requestUserId) {
        const { logUserId } = (0, disabled_helper_1.getDisabledInfo)(false, requestUserId);
        await prisma.membersAddresses.delete({
            where: {
                id,
            },
        });
        await logs_repository_1.default.store("members_addresses", {
            action: "delete",
            description: "Registro excluído por usuário",
            referenceId: id,
            userId: logUserId,
        });
    }
    async findByZipcode(zipcode, memberId) {
        const addresses = await prisma.membersAddresses.findMany({
            where: {
                zipcode,
                memberId,
            },
        });
        return addresses;
    }
}
exports.default = new AddressesRepository();
