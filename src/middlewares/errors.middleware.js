"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorsMiddleware = void 0;
const errors_handler_1 = require("../handlers/errors.handler");
const files_helper_1 = require("../helpers/files.helper");
function errorsMiddleware(error, request, response, next) {
    if (error instanceof errors_handler_1.AppError) {
        return response.status(error.status).json({
            message: error.message,
        });
    }
    if (error.message.match(/invalid signature/gi)) {
        return response.status(401).json({
            message: "Token inválido, tente novamente",
        });
    }
    if (error.message.match(/invalid token/gi)) {
        return response.status(401).json({
            message: "Token inválido, tente novamente",
        });
    }
    if (error.message.match(/invalid algorithm/gi)) {
        return response.status(401).json({
            message: "Token inválido, tente novamente",
        });
    }
    (0, files_helper_1.saveError)(error);
    return response.status(500).json({
        message: "Erro interno no servidor, tente novamente",
    });
}
exports.errorsMiddleware = errorsMiddleware;
