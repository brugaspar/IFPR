"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const permissions_controller_1 = __importDefault(require("../controllers/permissions.controller"));
const permissionsRouter = (0, express_1.Router)();
permissionsRouter.get("/permissions", authentication_middleware_1.authenticationMiddleware, permissions_controller_1.default.index);
exports.default = permissionsRouter;
