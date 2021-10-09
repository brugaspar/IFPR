import { Request, Response } from "express"
import * as yup from "yup"

import { AppError } from "../handlers/errors.handler"
import { checkBodySchema } from "../handlers/schema.handler"

import { verifyExistingPermissions } from "../helpers/permissions.helper"
import { hashPassword } from "../helpers/hash.helper"

import userRepository from "../repositories/user.repository"

type RequestUser = {
  name: string
  email: string
  password: string
  username: string
  permissions: string[]
  disabled: boolean
}

class UserController {
  async store(request: Request, response: Response) {
    const user: RequestUser = request.body

    const schema = {
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
      username: yup.string().required(),
      permissions: yup.array(),
      disabled: yup.boolean(),
    }

    await checkBodySchema(schema, request.body)

    const userExists = await userRepository.findByUsername(user.username)

    if (userExists) {
      throw new AppError("Usuário já existe")
    }

    const nonexistentPermissions = await verifyExistingPermissions(user.permissions)

    if (nonexistentPermissions.length) {
      return response.status(400).json({
        message: "Uma ou mais permissões não existem",
        nonexistentPermissions,
      })
    }

    if (user.permissions) {
      user.permissions = user.permissions.filter(
        (permission, index) => user.permissions.indexOf(permission) === index
      )
    }

    const hashedPassword = await hashPassword(user.password)

    user.password = hashedPassword

    const storedUser = await userRepository.store(user, request.userId)

    return response.status(201).json(storedUser)
  }
}

export default new UserController()
