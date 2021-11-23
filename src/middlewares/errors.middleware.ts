import { NextFunction, Request, Response } from "express"

import { AppError } from "../handlers/errors.handler"
import { saveError } from "../helpers/files.helper"

export function errorsMiddleware(error: Error, request: Request, response: Response, next: NextFunction) {
  if (error instanceof AppError) {
    return response.status(error.status).json({
      message: error.message,
    })
  }

  if (error.message.match(/invalid signature/gi)) {
    return response.status(401).json({
      message: "Token inválido, tente novamente",
    })
  }

  if (error.message.match(/invalid token/gi)) {
    return response.status(401).json({
      message: "Token inválido, tente novamente",
    })
  }

  if (error.message.match(/invalid algorithm/gi)) {
    return response.status(401).json({
      message: "Token inválido, tente novamente",
    })
  }

  saveError(error)

  console.log("\nError:\n")
  console.log(error)

  console.log("\nDetails:\n")
  console.log(error.message)
  console.log("\n\n")

  return response.status(500).json({
    message: "Erro interno no servidor, tente novamente",
  })
}
