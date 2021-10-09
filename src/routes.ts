import { Router } from "express"

import { authenticationMiddleware } from "./middlewares/authentication.middleware"

import authenticationController from "./controllers/authentication.controller"
import userController from "./controllers/user.controller"

const router = Router()

router.post("/authenticate", authenticationController.authenticate)

router.post("/users", authenticationMiddleware, userController.store)
router.get("/users", authenticationMiddleware, userController.index)
router.get("/users/:id", authenticationMiddleware, userController.show)

export { router }
