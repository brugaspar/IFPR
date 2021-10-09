import { NextFunction, Request, Response } from "express"

import { AppError } from "../handlers/errors.handler"

import { verifyToken } from "../helpers/token.helper"

type Token = {
  id: string
}

export function authenticationMiddleware(request: Request, response: Response, next: NextFunction) {
  const authorization = request.headers.authorization

  if (!authorization) {
    throw new AppError("Token de autenticação é necessário", 401)
  }

  if (!authorization.toUpperCase().includes("BEARER")) {
    throw new AppError("Token de autenticação precisa ser BEARER", 401)
  }

  const token = authorization.split(" ")[1]

  if (!token) {
    throw new AppError("Token de autenticação é necessário", 401)
  }

  const data = verifyToken(token) as Token

  request.userId = data.id

  return next()
}
