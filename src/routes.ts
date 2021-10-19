import { Router } from "express"

import { authenticationMiddleware } from "./middlewares/authentication.middleware"

import authenticationController from "./controllers/authentication.controller"
import userController from "./controllers/users.controller"
import cityController from "./controllers/cities.controller"
import permissionsController from "./controllers/permissions.controller"
import plansController from "./controllers/plans.controller"
import membersController from "./controllers/members.controller"

const router = Router()

router.post("/authenticate", authenticationController.authenticate)

router.post("/users", authenticationMiddleware, userController.store)
router.get("/users", authenticationMiddleware, userController.index)
router.get("/users/:id", authenticationMiddleware, userController.show)
router.put("/users/:id", authenticationMiddleware, userController.update)

router.get("/cities", authenticationMiddleware, cityController.index)

router.get("/permissions", authenticationMiddleware, permissionsController.index)

router.post("/plans", authenticationMiddleware, plansController.store)
router.get("/plans", authenticationMiddleware, plansController.index)
router.get("/plans/:id", authenticationMiddleware, plansController.show)
router.put("/plans/:id", authenticationMiddleware, plansController.update)

router.post("/members", authenticationMiddleware, membersController.store)
router.get("/members", authenticationMiddleware, membersController.index)
router.get("/members/:id", authenticationMiddleware, membersController.show)
router.put("/members/:id", authenticationMiddleware, membersController.update)

export { router }
