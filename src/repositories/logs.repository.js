"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require(".prisma/client");
const tables_repository_1 = __importDefault(require("./tables.repository"));
const prisma = new client_1.PrismaClient();
class LogsRepository {
    async store(tableName, log) {
        const table = await tables_repository_1.default.findByName(tableName);
        if (!table) {
            throw new Error(`Tabela inexistente: ${tableName}`);
        }
        await prisma.logs.create({
            data: {
                ...log,
                tableId: table.id,
            },
        });
    }
    async findAll() {
        const logs = await prisma.logs.findMany({
            include: {
                table: true,
                user: true,
            },
        });
        return logs;
    }
}
exports.default = new LogsRepository();
