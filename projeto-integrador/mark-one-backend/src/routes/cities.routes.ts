import { Router } from "express"

import { authenticationMiddleware } from "../middlewares/authentication.middleware"

import citiesController from "../controllers/cities.controller"

const citiesRouter = Router()

citiesRouter.get("/cities", authenticationMiddleware, citiesController.index)

export default citiesRouter
