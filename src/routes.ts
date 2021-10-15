import { Router } from "express"

import { authenticationMiddleware } from "./middlewares/authentication.middleware"

import authenticationController from "./controllers/authentication.controller"
import userController from "./controllers/users.controller"
import cityController from "./controllers/cities.controller"
import permissionsController from "./controllers/permissions.controller"

const router = Router()

router.post("/authenticate", authenticationController.authenticate)

router.post("/users", authenticationMiddleware, userController.store)
router.get("/users", authenticationMiddleware, userController.index)
router.get("/users/:id", authenticationMiddleware, userController.show)
router.put("/users/:id", authenticationMiddleware, userController.update)

router.get("/cities", authenticationMiddleware, cityController.index)

router.get("/permissions", authenticationMiddleware, permissionsController.index)

export { router }
