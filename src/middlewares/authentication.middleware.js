"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleware = void 0;
const errors_handler_1 = require("../handlers/errors.handler");
const token_helper_1 = require("../helpers/token.helper");
function authenticationMiddleware(request, response, next) {
    const authorization = request.headers.authorization;
    if (!authorization) {
        throw new errors_handler_1.AppError("Token de autenticação é necessário", 401);
    }
    if (!authorization.toUpperCase().includes("BEARER")) {
        throw new errors_handler_1.AppError("Token de autenticação precisa ser BEARER", 401);
    }
    const token = authorization.split(" ")[1];
    if (!token) {
        throw new errors_handler_1.AppError("Token de autenticação é necessário", 401);
    }
    const data = (0, token_helper_1.verifyToken)(token);
    request.userId = data.id;
    return next();
}
exports.authenticationMiddleware = authenticationMiddleware;
