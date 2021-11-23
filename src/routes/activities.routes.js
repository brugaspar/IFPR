"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const permissions_middleware_1 = require("../middlewares/permissions.middleware");
const activities_controller_1 = __importDefault(require("../controllers/activities.controller"));
const activitiesRouter = (0, express_1.Router)();
activitiesRouter.post("/activities", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["create_activities", "list_activities"]), activities_controller_1.default.store);
activitiesRouter.get("/activities", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["list_activities"]), activities_controller_1.default.index);
activitiesRouter.get("/activities/:id", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["list_activities", "edit_activities"]), activities_controller_1.default.show);
activitiesRouter.put("/activities/:id", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["edit_activities", "list_activities"]), activities_controller_1.default.update);
exports.default = activitiesRouter;
