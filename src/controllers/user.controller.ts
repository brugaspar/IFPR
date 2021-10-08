import { Request, Response } from "express"

import { verifyExistingPermissions } from "../helpers/verifyExistingPermissions"

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

    const userExists = await userRepository.findByUsername(user.username)

    if (userExists) {
      return response.status(400).json({ message: "Usuário já existe" })
    }

    const nonexistentPermissions = await verifyExistingPermissions(user.permissions)

    if (nonexistentPermissions.length) {
      return response.status(400).json({
        message: "Uma ou mais permissões não existem",
        nonexistentPermissions,
      })
    }

    if (user.permissions) {
      user.permissions = user.permissions.filter((permission, index) => user.permissions.indexOf(permission) === index)
    }

    const storedUser = await userRepository.store(user, "dc20ceb4-61f4-46ec-809e-380078a8a153")

    return response.status(201).json(storedUser)
  }
}

export default new UserController()
