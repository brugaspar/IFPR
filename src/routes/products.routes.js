"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const permissions_middleware_1 = require("../middlewares/permissions.middleware");
const brands_controller_1 = __importDefault(require("../controllers/brands.controller"));
const groups_controller_1 = __importDefault(require("../controllers/groups.controller"));
const products_controller_1 = __importDefault(require("../controllers/products.controller"));
const productsRouter = (0, express_1.Router)();
// Brands:
productsRouter.post("/brands", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["create_brands", "list_brands"]), brands_controller_1.default.store);
productsRouter.get("/brands", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["list_brands"]), brands_controller_1.default.index);
productsRouter.get("/brands/:id", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["list_brands", "edit_brands"]), brands_controller_1.default.show);
productsRouter.put("/brands/:id", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["edit_brands", "list_brands"]), brands_controller_1.default.update);
// Groups:
productsRouter.post("/groups", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["create_groups", "list_groups"]), groups_controller_1.default.store);
productsRouter.get("/groups", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["list_groups"]), groups_controller_1.default.index);
productsRouter.get("/groups/:id", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["list_groups", "edit_groups"]), groups_controller_1.default.show);
productsRouter.put("/groups/:id", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["edit_groups", "list_groups"]), groups_controller_1.default.update);
// Products:
productsRouter.post("/products", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["create_products", "list_products"]), products_controller_1.default.store);
productsRouter.get("/products", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["list_products"]), products_controller_1.default.index);
productsRouter.get("/products/:id", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["list_products", "edit_products"]), products_controller_1.default.show);
productsRouter.put("/products/:id", authentication_middleware_1.authenticationMiddleware, (0, permissions_middleware_1.permissionsMiddleware)(["edit_products", "list_products"]), products_controller_1.default.update);
exports.default = productsRouter;
