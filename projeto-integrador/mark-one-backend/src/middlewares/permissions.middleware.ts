import { NextFunction, Request, Response } from "express"

import { AppError } from "../handlers/errors.handler"
import { checkRequestUser } from "../helpers/request.helper"

import usersRepository from "../repositories/users.repository"

export function permissionsMiddleware(permissions: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    await checkRequestUser(request.userId)

    const user = await usersRepository.findById(request.userId)

    if (!user) {
      throw new AppError("Usuário não encontrado")
    }

    const userPermissions = user.permissions as string[]

    let nonexistentPermissions: string[] = []

    permissions.forEach((permission) => {
      const permissionExists = userPermissions.includes(permission)
      if (!permissionExists) {
        nonexistentPermissions.push(permission)
      }
    })

    if (nonexistentPermissions.length) {
      throw new AppError("Usuário sem permissão", 401)
    }

    return next()
  }
}
