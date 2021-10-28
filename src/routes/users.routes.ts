import { Router } from "express"

import { authenticationMiddleware } from "../middlewares/authentication.middleware"
import { permissionsMiddleware } from "../middlewares/permissions.middleware"

import authenticationController from "../controllers/authentication.controller"
import usersController from "../controllers/users.controller"

const usersRouter = Router()

usersRouter.post("/authenticate", authenticationController.authenticate)

usersRouter.post(
  "/users",
  authenticationMiddleware,
  permissionsMiddleware(["create_users", "list_users"]),
  usersController.store
)

usersRouter.get(
  "/users",
  authenticationMiddleware,
  permissionsMiddleware(["list_users"]),
  usersController.index
)

usersRouter.get(
  "/users/:id",
  authenticationMiddleware,
  permissionsMiddleware(["list_users", "edit_users"]),
  usersController.show
)

usersRouter.put(
  "/users/:id",
  authenticationMiddleware,
  permissionsMiddleware(["edit_users", "list_users"]),
  usersController.update
)

export default usersRouter
