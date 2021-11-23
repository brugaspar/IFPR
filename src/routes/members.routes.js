"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const multer_configuration_1 = __importDefault(require("../configuration/multer.configuration"));
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const permissions_middleware_1 = require("../middlewares/permissions.middleware");
const members_controller_1 = __importDefault(require("../controllers/members.controller"));
const membersRouter = (0, express_1.Router)();
membersRouter.post("/members", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["create_members", "list_members"]), (0, multer_1.default)(multer_configuration_1.default).array("files"), members_controller_1.default.store);
membersRouter.get("/members", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["list_members"]), members_controller_1.default.index);
membersRouter.get("/members/documents", authentication_middleware_1.authenticationMiddleware, members_controller_1.default.findDocuments);
membersRouter.get("/members/:id", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["list_members", "edit_members"]), members_controller_1.default.show);
membersRouter.put("/members/:id", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["edit_members", "list_members"]), (0, multer_1.default)(multer_configuration_1.default).array("files"), members_controller_1.default.update);
exports.default = membersRouter;
