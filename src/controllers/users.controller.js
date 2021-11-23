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
const permissions_helper_1 = require("../helpers/permissions.helper");
const hash_helper_1 = require("../helpers/hash.helper");
const request_helper_1 = require("../helpers/request.helper");
const users_repository_1 = __importDefault(require("../repositories/users.repository"));
class UserController {
    async store(request, response) {
        const user = request.body;
        const schema = {
            name: yup.string().required("Nome é obrigatório"),
            email: yup.string().email().required("E-mail é obrigatório"),
            password: yup.string().required("Senha é obrigatória"),
            username: yup.string().required("Nome de usuário é obrigatório"),
            permissions: yup.array(),
            disabled: yup.boolean(),
        };
        await (0, schema_handler_1.checkBodySchema)(schema, request.body);
        await (0, request_helper_1.checkRequestUser)(request.userId);
        const usernameExists = await users_repository_1.default.findByUsername(user.username);
        if (usernameExists) {
            throw new errors_handler_1.AppError("Nome de usuário já está em uso");
        }
        const emailExists = await users_repository_1.default.findByEmail(user.email);
        if (emailExists) {
            throw new errors_handler_1.AppError("E-mail já está em uso");
        }
        if (user.permissions) {
            const nonexistentPermissions = await (0, permissions_helper_1.verifyExistingPermissions)(user.permissions);
            if (nonexistentPermissions.length) {
                return response.status(400).json({
                    message: "Uma ou mais permissões não existem",
                    nonexistentPermissions,
                });
            }
            user.permissions = user.permissions.filter((permission, index) => user.permissions.indexOf(permission) === index);
        }
        const hashedPassword = await (0, hash_helper_1.hashPassword)(user.password);
        user.password = hashedPassword;
        const storedUser = await users_repository_1.default.store(user, request.userId);
        return response.status(201).json({ id: storedUser });
    }
    async index(request, response) {
        const { onlyEnabled = true, search = "" } = request.query;
        await (0, request_helper_1.checkRequestUser)(request.userId);
        const users = await users_repository_1.default.findAll({
            onlyEnabled: JSON.parse(onlyEnabled),
            search,
        });
        const parsedUsers = users.map((user) => {
            return {
                ...user,
                password: undefined,
            };
        });
        return response.status(200).json(parsedUsers);
    }
    async show(request, response) {
        const id = request.params.id;
        await (0, request_helper_1.checkRequestUser)(request.userId);
        const user = await users_repository_1.default.findById(!id ? request.userId : id);
        if (!user) {
            throw new errors_handler_1.AppError("Usuário não encontrado");
        }
        const parsedUser = {
            ...user,
            password: undefined,
        };
        return response.status(200).json(parsedUser);
    }
    async findPermissions(request, response) {
        const user = await users_repository_1.default.findById(request.userId);
        if (!user) {
            throw new errors_handler_1.AppError("Usuário não encontrado");
        }
        return response.status(200).json({ permissions: user.permissions });
    }
    async update(request, response) {
        const user = request.body;
        const id = request.params.id;
        const schema = {
            name: yup.string(),
            email: yup.string().email(),
            password: yup.string(),
            username: yup.string(),
            permissions: yup.array(),
            disabled: yup.boolean(),
        };
        await (0, schema_handler_1.checkBodySchema)(schema, request.body);
        await (0, request_helper_1.checkRequestUser)(request.userId);
        const usersExists = await users_repository_1.default.findById(id);
        if (!usersExists) {
            throw new errors_handler_1.AppError("Usuário não encontrado");
        }
        if (user.username && user.username !== usersExists.username) {
            const usernameExists = await users_repository_1.default.findByUsername(user.username);
            if (usernameExists) {
                throw new errors_handler_1.AppError("Nome de usuário já está em uso");
            }
        }
        if (user.email && user.email !== usersExists.email) {
            const emailExists = await users_repository_1.default.findByEmail(user.email);
            if (emailExists) {
                throw new errors_handler_1.AppError("E-mail já está em uso");
            }
        }
        if (user.newPassword) {
            const matchPasswords = await (0, hash_helper_1.comparePassword)(user.password, usersExists.password);
            if (!matchPasswords) {
                throw new errors_handler_1.AppError("Senha atual não confere");
            }
            user.password = user.newPassword;
        }
        if (user.permissions) {
            const nonexistentPermissions = await (0, permissions_helper_1.verifyExistingPermissions)(user.permissions);
            if (nonexistentPermissions.length) {
                return response.status(400).json({
                    message: "Uma ou mais permissões não existem",
                    nonexistentPermissions,
                });
            }
            user.permissions = user.permissions.filter((permission, index) => user.permissions.indexOf(permission) === index);
        }
        if (user.password) {
            const hashedPassword = await (0, hash_helper_1.hashPassword)(user.password);
            user.password = hashedPassword;
        }
        delete user.newPassword;
        const updatedUser = await users_repository_1.default.update({
            user,
            requestUserId: request.userId,
            userId: id,
        });
        return response.status(200).json({ id: updatedUser });
    }
}
exports.default = new UserController();
