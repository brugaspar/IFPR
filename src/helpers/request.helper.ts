import usersRepository from "../repositories/users.repository"

import { AppError } from "../handlers/errors.handler"

export async function checkRequestUser(requestUserId: string) {
  const requestUserExists = await usersRepository.findById(requestUserId)

  const adminId = process.env.MASTER_ADMIN_ID

  if (!requestUserExists && !(requestUserId === adminId)) {
    throw new AppError("Usuário não autenticado ou token inválido, tente novamente")
  }
}
