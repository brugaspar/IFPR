import "express-async-errors";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import { ErrorMiddleware } from "./application/middlewares/ErrorMiddleware";
import { router } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/", router);

app.use(ErrorMiddleware.handle);

export { app };
