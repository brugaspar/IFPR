import "express-async-errors";
import express from "express";

import { ErrorMiddleware } from "./application/middlewares/ErrorMiddleware";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use("/api/v1/", router);

app.use(ErrorMiddleware.handle);

export { app };
