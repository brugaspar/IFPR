import { Router } from "express"

import usersRouter from "./users.routes"
import citiesRouter from "./cities.routes"
import permissionsRouter from "./permissions.routes"
import plansRouter from "./plans.routes"
import membersRouter from "./members.routes"
import logsRouter from "./logs.routes"

const router = Router()

router.use(usersRouter)
router.use(citiesRouter)
router.use(permissionsRouter)
router.use(plansRouter)
router.use(membersRouter)
router.use(logsRouter)

export { router }
