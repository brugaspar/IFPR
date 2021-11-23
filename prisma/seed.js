"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require(".prisma/client");
const tables_json_1 = __importDefault(require("./data/tables.json"));
const permissions_json_1 = __importDefault(require("./data/permissions.json"));
const cities_json_1 = __importDefault(require("./data/cities.json"));
const states_json_1 = __importDefault(require("./data/states.json"));
const prisma = new client_1.PrismaClient();
async function deleteFromAllTables() {
    await prisma.users.deleteMany();
    await prisma.membersAddresses.deleteMany();
    await prisma.membersDocuments.deleteMany();
    await prisma.members.deleteMany();
    await prisma.cities.deleteMany();
    await prisma.states.deleteMany();
    await prisma.permissions.deleteMany();
    await prisma.logs.deleteMany();
    await prisma.tables.deleteMany();
}
async function insertTables() {
    await prisma.tables.createMany({
        data: tables_json_1.default,
    });
}
async function insertPermissions() {
    const parsedPermissions = [];
    for (const permission of permissions_json_1.default) {
        const table = await prisma.tables.findUnique({
            where: {
                name: permission.table,
            },
            select: {
                id: true,
            },
        });
        parsedPermissions.push({
            name: permission.name,
            slug: permission.slug,
            description: permission.description,
            tableId: table?.id || "",
        });
    }
    await prisma.permissions.createMany({
        data: parsedPermissions,
    });
}
async function insertStates() {
    await prisma.states.createMany({
        data: states_json_1.default,
    });
}
async function insertCities() {
    await prisma.cities.createMany({
        data: cities_json_1.default,
    });
}
async function insertAdminUser() {
    const adminId = process.env.ADMIN_ID || "ADMIN-ID";
    await prisma.users.create({
        data: {
            id: adminId,
            name: "Administrador",
            email: "admin@admin.com",
            password: "$2a$10$7HEUt9Y6r6.xqqsOdqbFl.TEf9i7xtHdlgmA2EcmlgzY5XD9EWg2K",
            permissions: ["list_users", "create_users", "edit_users", "disable_users", "alter_permissions"],
            username: "administrador",
            createdBy: adminId,
            lastUpdatedBy: adminId,
        },
    });
}
async function insertSeedData() {
    await deleteFromAllTables();
    await insertTables();
    await insertPermissions();
    await insertStates();
    await insertCities();
    await insertAdminUser();
}
insertSeedData();
