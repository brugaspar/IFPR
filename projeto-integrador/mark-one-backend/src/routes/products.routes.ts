import { Router } from "express"

import { authenticationMiddleware } from "../middlewares/authentication.middleware"
import { permissionsMiddleware } from "../middlewares/permissions.middleware"

import brandsController from "../controllers/brands.controller"
import groupsController from "../controllers/groups.controller"
import productsController from "../controllers/products.controller"

const productsRouter = Router()

// Brands:

productsRouter.post(
  "/brands",
  authenticationMiddleware,
  permissionsMiddleware(["create_brands", "list_brands"]),
  brandsController.store
)

productsRouter.get("/brands", authenticationMiddleware, permissionsMiddleware(["list_brands"]), brandsController.index)

productsRouter.get(
  "/brands/:id",
  authenticationMiddleware,
  permissionsMiddleware(["list_brands", "edit_brands"]),
  brandsController.show
)

productsRouter.put(
  "/brands/:id",
  authenticationMiddleware,
  permissionsMiddleware(["edit_brands", "list_brands"]),
  brandsController.update
)

// Groups:

productsRouter.post(
  "/groups",
  authenticationMiddleware,
  permissionsMiddleware(["create_groups", "list_groups"]),
  groupsController.store
)

productsRouter.get("/groups", authenticationMiddleware, permissionsMiddleware(["list_groups"]), groupsController.index)

productsRouter.get(
  "/groups/:id",
  authenticationMiddleware,
  permissionsMiddleware(["list_groups", "edit_groups"]),
  groupsController.show
)

productsRouter.put(
  "/groups/:id",
  authenticationMiddleware,
  permissionsMiddleware(["edit_groups", "list_groups"]),
  groupsController.update
)

// Products:

productsRouter.post(
  "/products",
  authenticationMiddleware,
  permissionsMiddleware(["create_products", "list_products"]),
  productsController.store
)

productsRouter.get("/products", authenticationMiddleware, permissionsMiddleware(["list_products"]), productsController.index)

productsRouter.get(
  "/products/:id",
  authenticationMiddleware,
  permissionsMiddleware(["list_products", "edit_products"]),
  productsController.show
)

productsRouter.put(
  "/products/:id",
  authenticationMiddleware,
  permissionsMiddleware(["edit_products", "list_products"]),
  productsController.update
)

export default productsRouter
