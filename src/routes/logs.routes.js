"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const permissions_middleware_1 = require("../middlewares/permissions.middleware");
const logs_controller_1 = __importDefault(require("../controllers/logs.controller"));
const logsRouter = (0, express_1.Router)();
logsRouter.get("/logs", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["list_logs"]), logs_controller_1.default.index);
exports.default = logsRouter;
