"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require(".prisma/client");
const prisma = new client_1.PrismaClient();
class PermissionsRepository {
    async findAll({ tableId }) {
        const permissions = await prisma.permissions.findMany({
            where: {
                tableId: tableId ? tableId : undefined,
            },
        });
        return permissions;
    }
}
exports.default = new PermissionsRepository();
