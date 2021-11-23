"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionsMiddleware = void 0;
const errors_handler_1 = require("../handlers/errors.handler");
const request_helper_1 = require("../helpers/request.helper");
const users_repository_1 = __importDefault(require("../repositories/users.repository"));
function permissionsMiddleware(permissions) {
    return async (request, response, next) => {
        await (0, request_helper_1.checkRequestUser)(request.userId);
        const user = await users_repository_1.default.findById(request.userId);
        if (!user) {
            throw new errors_handler_1.AppError("Usuário não encontrado");
        }
        const userPermissions = user.permissions;
        let nonexistentPermissions = [];
        permissions.forEach((permission) => {
            const permissionExists = userPermissions.includes(permission);
            if (!permissionExists) {
                nonexistentPermissions.push(permission);
            }
        });
        // const permissionExists = userPermissions
        //   .map((permission) => permission)
        //   .some((permission) => permissions.includes(permission))
        if (nonexistentPermissions.length) {
            throw new errors_handler_1.AppError("Usuário sem permissão", 401);
        }
        return next();
    };
}
exports.permissionsMiddleware = permissionsMiddleware;
