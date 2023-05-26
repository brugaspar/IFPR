import { Router } from "express"

import { authenticationMiddleware } from "../middlewares/authentication.middleware"
import { permissionsMiddleware } from "../middlewares/permissions.middleware"

import activitiesController from "../controllers/activities.controller"

const activitiesRouter = Router()

activitiesRouter.post(
  "/activities",
  authenticationMiddleware,
  permissionsMiddleware(["create_activities", "list_activities"]),
  activitiesController.store
)

activitiesRouter.get(
  "/activities",
  authenticationMiddleware,
  permissionsMiddleware(["list_activities"]),
  activitiesController.index
)

activitiesRouter.get(
  "/activities/:id",
  authenticationMiddleware,
  permissionsMiddleware(["list_activities", "edit_activities"]),
  activitiesController.show
)

activitiesRouter.put(
  "/activities/:id",
  authenticationMiddleware,
  permissionsMiddleware(["edit_activities", "list_activities"]),
  activitiesController.update
)

export default activitiesRouter
