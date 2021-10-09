import { Request, Response } from "express"

import { AppError } from "../handlers/errors.handler"

import { comparePassword } from "../helpers/hash.helper"
import { generateToken } from "../helpers/token.helper"

import userRepository from "../repositories/user.repository"

type RequestAuthentication = {
  username: string
  password: string
}

class AuthenticationController {
  async authenticate(request: Request, response: Response) {
    const { username, password }: RequestAuthentication = request.body

    const user = await userRepository.findByUsername(username)

    if (!user) {
      throw new AppError("Usuário ou senha incorretos")
    }

    const matchPasswords = await comparePassword(password, user.password)

    if (!matchPasswords) {
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
