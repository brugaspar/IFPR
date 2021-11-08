import { Router } from "express"

import { authenticationMiddleware } from "../middlewares/authentication.middleware"
import { permissionsMiddleware } from "../middlewares/permissions.middleware"

import logsController from "../controllers/logs.controller"

const logsRouter = Router()

logsRouter.get("/logs", authenticationMiddleware, permissionsMiddleware(["list_logs"]), logsController.index)

export default logsRouter
