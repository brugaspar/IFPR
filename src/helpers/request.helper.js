"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRequestUser = void 0;
const users_repository_1 = __importDefault(require("../repositories/users.repository"));
const errors_handler_1 = require("../handlers/errors.handler");
async function checkRequestUser(requestUserId) {
    const requestUserExists = await users_repository_1.default.findById(requestUserId);
    const adminId = process.env.MASTER_ADMIN_ID;
    if (!requestUserExists && !(requestUserId === adminId)) {
        throw new errors_handler_1.AppError("Usuário não autenticado ou token inválido, tente novamente");
    }
}
exports.checkRequestUser = checkRequestUser;
