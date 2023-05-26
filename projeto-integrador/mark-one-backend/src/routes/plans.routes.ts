import { Router } from "express"

import { authenticationMiddleware } from "../middlewares/authentication.middleware"
import { permissionsMiddleware } from "../middlewares/permissions.middleware"

import plansController from "../controllers/plans.controller"

const plansRouter = Router()

plansRouter.post("/plans", authenticationMiddleware, permissionsMiddleware(["create_plans", "list_plans"]), plansController.store)

plansRouter.get("/plans", authenticationMiddleware, permissionsMiddleware(["list_plans"]), plansController.index)

plansRouter.get("/plans/:id", authenticationMiddleware, permissionsMiddleware(["list_plans", "edit_plans"]), plansController.show)

plansRouter.put(
  "/plans/:id",
  authenticationMiddleware,
  permissionsMiddleware(["edit_plans", "list_plans"]),
  plansController.update
)

export default plansRouter
