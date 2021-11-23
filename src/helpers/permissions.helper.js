"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyExistingPermissions = void 0;
const permissions_repository_1 = __importDefault(require("../repositories/permissions.repository"));
async function verifyExistingPermissions(permissions) {
    const storedPermissions = await permissions_repository_1.default.findAll({
        tableId: undefined,
    });
    const nonexistentPermissions = [];
    const slugs = storedPermissions.map((permission) => permission.slug);
    if (permissions) {
        permissions.forEach((permission) => {
            if (!slugs.includes(permission)) {
                nonexistentPermissions.push(permission);
            }
        });
    }
    return nonexistentPermissions;
}
exports.verifyExistingPermissions = verifyExistingPermissions;
