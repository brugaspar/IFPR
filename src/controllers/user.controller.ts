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

type FilterUser = {
  onlyEnabled: boolean
}

class UserController {
  async store(request: Request, response: Response) {
    const user: RequestUser = request.body

    const schema = {
      name: yup.string().required("Nome é obrigatório"),
      email: yup.string().email().required("E-mail é obrigatório"),
      password: yup.string().required("Senha é obrigatória"),
      username: yup.string().required("Nome de usuário é obrigatório"),
      permissions: yup.array(),
      disabled: yup.boolean(),
    }

    await checkBodySchema(schema, request.body)

    const requestUserExists = await userRepository.findById(request.userId)

    if (!requestUserExists) {
      throw new AppError("Usuário não autenticado ou token inválido, tente novamente")
    }

    const usernameExists = await userRepository.findByUsername(user.username)

    if (usernameExists) {
      throw new AppError("Nome de usuário já está em uso")
    }

    const emailExists = await userRepository.findByEmail(user.email)

    if (emailExists) {
      throw new AppError("E-mail já está em uso")
    }

    if (user.permissions) {
      const nonexistentPermissions = await verifyExistingPermissions(user.permissions)

      if (nonexistentPermissions.length) {
        return response.status(400).json({
          message: "Uma ou mais permissões não existem",
          nonexistentPermissions,
        })
      }

      user.permissions = user.permissions.filter(
        (permission, index) => user.permissions.indexOf(permission) === index
      )
    }

    const hashedPassword = await hashPassword(user.password)

    user.password = hashedPassword

    const storedUser = await userRepository.store(user, request.userId)

    return response.status(201).json({ id: storedUser })
  }

  async index(request: Request, response: Response) {
    const { onlyEnabled = true }: FilterUser = request.body

    const schema = {
      onlyEnabled: yup.boolean(),
    }

    await checkBodySchema(schema, request.body)

    const users = await userRepository.findAll(onlyEnabled)

    const parsedUsers = users.map((user) => {
      return {
        ...user,
        password: undefined,
      }
    })

    return response.status(200).json(parsedUsers)
  }

  async show(request: Request, response: Response) {
    const id = request.params.id

    const user = await userRepository.findById(id)

    const parsedUser = {
      ...user,
      password: undefined,
    }

    return response.status(200).json(parsedUser)
  }

  async update(request: Request, response: Response) {
    const user: RequestUser = request.body

    const id = request.params.id

    const schema = {
      name: yup.string(),
      email: yup.string().email(),
      password: yup.string(),
      username: yup.string(),
      permissions: yup.array(),
      disabled: yup.boolean(),
    }

    await checkBodySchema(schema, request.body)

    const requestUserExists = await userRepository.findById(request.userId)

    if (!requestUserExists) {
      throw new AppError("Usuário não autenticado ou token inválido, tente novamente")
    }

    if (user.username) {
      const usernameExists = await userRepository.findByUsername(user.username)

      if (usernameExists) {
        throw new AppError("Nome de usuário já está em uso")
      }
    }

    if (user.email) {
      const emailExists = await userRepository.findByEmail(user.email)

      if (emailExists) {
        throw new AppError("E-mail já está em uso")
      }
    }

    if (user.permissions) {
      const nonexistentPermissions = await verifyExistingPermissions(user.permissions)

      if (nonexistentPermissions.length) {
        return response.status(400).json({
          message: "Uma ou mais permissões não existem",
          nonexistentPermissions,
        })
      }

      user.permissions = user.permissions.filter(
        (permission, index) => user.permissions.indexOf(permission) === index
      )
    }

    if (user.password) {
      const hashedPassword = await hashPassword(user.password)

      user.password = hashedPassword
    }

    const updatedUser = await userRepository.update({
      user,
      requestUserId: request.userId,
      userId: id,
    })

    return response.status(200).json({ id: updatedUser })
  }
}

export default new UserController()
