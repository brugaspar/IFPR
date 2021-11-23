"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const permissions_middleware_1 = require("../middlewares/permissions.middleware");
const authentication_controller_1 = __importDefault(require("../controllers/authentication.controller"));
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const usersRouter = (0, express_1.Router)();
usersRouter.post("/authenticate", authentication_controller_1.default.authenticate);
usersRouter.post("/users", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["create_users", "list_users"]), users_controller_1.default.store);
usersRouter.get("/users/permissions", authentication_middleware_1.authenticationMiddleware, users_controller_1.default.findPermissions);
usersRouter.get("/users/token", authentication_middleware_1.authenticationMiddleware, users_controller_1.default.show);
usersRouter.get("/users", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["list_users"]), users_controller_1.default.index);
usersRouter.get("/users/:id", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["list_users", "edit_users"]), users_controller_1.default.show);
usersRouter.put("/users/:id", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["edit_users", "list_users"]), users_controller_1.default.update);
exports.default = usersRouter;
