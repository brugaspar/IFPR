import usersRepository from "../repositories/users.repository"

import { AppError } from "../handlers/errors.handler"

export async function checkRequestUser(requestUserId: string) {
  const requestUserExists = await usersRepository.findById(requestUserId)

  if (!requestUserExists) {
    throw new AppError("Usuário não autenticado ou token inválido, tente novamente")
  }
}
