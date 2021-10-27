import "dotenv/config"
import "express-async-errors"

import express from "express"
import cors from "cors"
import morgan from "morgan"
import path from "path"

import { router } from "./routes"

import { authenticationMiddleware } from "./middlewares/authentication.middleware"

import { errorsMiddleware } from "./middlewares/errors.middleware"

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use("/api/v1", router)

app.use("/files", authenticationMiddleware, express.static("uploads"))

app.use(errorsMiddleware)

export { app }
