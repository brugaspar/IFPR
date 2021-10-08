import "dotenv/config"

import express from "express"

import { router } from "./routes"

const app = express()

app.use(express.json())
app.use("/api/v1", router)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`\nServer running on ${port}\n`))

// TODO: criar arquivo app.ts, para separar a lógica do server.ts
// TODO: implementar captura de erros automática com express-async-errors
