import { Router } from "express"

import { authenticationMiddleware } from "../middlewares/authentication.middleware"
import { permissionsMiddleware } from "../middlewares/permissions.middleware"

import membersController from "../controllers/members.controller"

const membersRouter = Router()

membersRouter.post(
  "/members",
  authenticationMiddleware,
  permissionsMiddleware(["create_members", "list_members"]),
  membersController.store
)

membersRouter.get("/members", authenticationMiddleware, permissionsMiddleware(["list_members"]), membersController.index)

membersRouter.get(
  "/members/:id",
  authenticationMiddleware,
  permissionsMiddleware(["list_members", "edit_members"]),
  membersController.show
)

membersRouter.put(
  "/members/:id",
  authenticationMiddleware,
  permissionsMiddleware(["edit_members", "list_members"]),
  membersController.update
)

export default membersRouter
