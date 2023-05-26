import { Router } from "express"

import { authenticationMiddleware } from "../middlewares/authentication.middleware"

import permissionsController from "../controllers/permissions.controller"

const permissionsRouter = Router()

permissionsRouter.get("/permissions", authenticationMiddleware, permissionsController.index)

export default permissionsRouter
