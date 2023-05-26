import { Router } from "express"

import usersRouter from "./users.routes"
import citiesRouter from "./cities.routes"
import permissionsRouter from "./permissions.routes"
import plansRouter from "./plans.routes"
import membersRouter from "./members.routes"
import logsRouter from "./logs.routes"
import productsRouter from "./products.routes"
import activitiesRouter from "./activities.routes"

import { authenticationMiddleware } from "../middlewares/authentication.middleware"

import totalsController from "../controllers/totals.controller"

const router = Router()

router.use(usersRouter)
router.use(citiesRouter)
router.use(permissionsRouter)
router.use(plansRouter)
router.use(membersRouter)
router.use(logsRouter)
router.use(productsRouter)
router.use(activitiesRouter)

router.get("/totals", authenticationMiddleware, totalsController.index)

export { router }
