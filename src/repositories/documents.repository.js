"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require(".prisma/client");
const disabled_helper_1 = require("../helpers/disabled.helper");
const logs_repository_1 = __importDefault(require("./logs.repository"));
const prisma = new client_1.PrismaClient();
class DocumentsRepository {
    async store(document, requestUserId) {
        const { lastUpdatedBy, createdBy, logUserId } = (0, disabled_helper_1.getDisabledInfo)(false, requestUserId);
        const { id } = await prisma.membersDocuments.create({
            data: {
                ...document,
                createdBy,
                lastUpdatedBy,
            },
            select: {
                id: true,
            },
        });
        await logs_repository_1.default.store("members_documents", {
            action: "insert",
            description: "Registro incluído por usuário",
            referenceId: id,
            userId: logUserId,
        });
        return id;
    }
}
exports.default = new DocumentsRepository();
