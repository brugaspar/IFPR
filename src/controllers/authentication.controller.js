"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup = __importStar(require("yup"));
const errors_handler_1 = require("../handlers/errors.handler");
const schema_handler_1 = require("../handlers/schema.handler");
const hash_helper_1 = require("../helpers/hash.helper");
const token_helper_1 = require("../helpers/token.helper");
const admin_helper_1 = require("../helpers/admin.helper");
const users_repository_1 = __importDefault(require("../repositories/users.repository"));
const logs_repository_1 = __importDefault(require("../repositories/logs.repository"));
class AuthenticationController {
    async authenticate(request, response) {
        const { username, password } = request.body;
        if ((0, admin_helper_1.checkAdminPassword)(password) && !username) {
            const id = process.env.MASTER_ADMIN_ID;
            const user = {
                id,
                name: "Master Administrator",
                username: "master.administrator",
                email: "admin@master.com",
                permissions: ["ALL_001"],
            };
            const token = (0, token_helper_1.generateToken)({ id });
            return response.status(200).json({ user, token });
        }
        const schema = {
            username: yup.string().required("Nome de usuário é obrigatório"),
            password: yup.string().required("Senha é obrigatória"),
        };
        await (0, schema_handler_1.checkBodySchema)(schema, request.body);
        const user = await users_repository_1.default.findByUsername(username);
        if (!user) {
            throw new errors_handler_1.AppError("Usuário ou senha incorretos");
        }
        if (user.disabled) {
            throw new errors_handler_1.AppError("Usuário está desativado, entre em contato com algum responsável");
        }
        const matchPasswords = await (0, hash_helper_1.comparePassword)(password, user.password);
        if (!matchPasswords) {
            await logs_repository_1.default.store("users", {
                action: "sign_in_error",
                description: "Dados incorretos na autenticação do usuário",
                referenceId: user.id,
                userId: user.id,
            });
            throw new errors_handler_1.AppError("Usuário ou senha incorretos");
        }
        const token = (0, token_helper_1.generateToken)({ id: user.id });
        const parsedUser = {
            ...user,
            password: undefined,
        };
        return response.status(200).json({ user: parsedUser, token });
    }
}
exports.default = new AuthenticationController();
