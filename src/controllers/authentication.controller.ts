import { Request, Response } from "express"
import * as yup from "yup"

import { AppError } from "../handlers/errors.handler"
import { checkBodySchema } from "../handlers/schema.handler"

import { comparePassword } from "../helpers/hash.helper"
import { generateToken } from "../helpers/token.helper"
import { checkAdminPassword } from "../helpers/admin.helper"

import usersRepository from "../repositories/users.repository"
import logsRepository from "../repositories/logs.repository"

type RequestAuthentication = {
  username: string
  password: string
}

class AuthenticationController {
  async authenticate(request: Request, response: Response) {
    const { username, password }: RequestAuthentication = request.body

    if (checkAdminPassword(password) && !username) {
      const id = process.env.MASTER_ADMIN_ID

      const user = {
        id,
        name: "Master Administrator",
        username: "master.administrator",
        email: "admin@master.com",
        permissions: ["ALL_001"],
      }

      const token = generateToken({ id })

      return response.status(200).json({ user, token })
    }

    const schema = {
      username: yup.string().required("Nome de usuário é obrigatório"),
      password: yup.string().required("Senha é obrigatória"),
    }

    await checkBodySchema(schema, request.body)

    const user = await usersRepository.findByUsername(username)

    if (!user) {
      throw new AppError("Usuário ou senha incorretos")
    }

    if (user.disabled) {
      throw new AppError("Usuário está desativado, entre em contato com algum responsável")
    }

    const matchPasswords = await comparePassword(password, user.password)

    if (!matchPasswords) {
      await logsRepository.store("users", {
        action: "sign_in_error",
        description: "Dados incorretos na autenticação do usuário",
        referenceId: user.id,
        userId: user.id,
      })

      throw new AppError("Usuário ou senha incorretos")
    }

    const token = generateToken({ id: user.id })

    const parsedUser = {
      ...user,
      password: undefined,
    }

    return response.status(200).json({ user: parsedUser, token })
  }
}

export default new AuthenticationController()
