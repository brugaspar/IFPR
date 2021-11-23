"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require(".prisma/client");
const prisma = new client_1.PrismaClient();
class TablesRepository {
    async findByName(name) {
        const id = await prisma.tables.findUnique({
            where: {
                name,
            },
            select: {
                id: true,
            },
        });
        return id;
    }
}
exports.default = new TablesRepository();
