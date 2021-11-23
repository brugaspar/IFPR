"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const permissions_middleware_1 = require("../middlewares/permissions.middleware");
const plans_controller_1 = __importDefault(require("../controllers/plans.controller"));
const plansRouter = (0, express_1.Router)();
plansRouter.post("/plans", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["create_plans", "list_plans"]), plans_controller_1.default.store);
plansRouter.get("/plans", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["list_plans"]), plans_controller_1.default.index);
plansRouter.get("/plans/:id", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["list_plans", "edit_plans"]), plans_controller_1.default.show);
plansRouter.put("/plans/:id", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["edit_plans", "list_plans"]), plans_controller_1.default.update);
exports.default = plansRouter;
