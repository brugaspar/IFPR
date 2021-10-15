import { PrismaClient } from ".prisma/client"

import { getDisabledInfo } from "../helpers/disabled.helper"

import logsRepository from "./logs.repository"

type User = {
  name: string
  email: string
  password: string
  username: string
  permissions: string[]
  disabled: boolean
}

type UpdateUserProps = {
  user: User
  requestUserId: string
  userId: string
}

const prisma = new PrismaClient()

class UsersRepository {
  async store(user: User, requestUserId: string) {
    const { disabledAt, lastDisabledBy, lastUpdatedBy, createdBy, logUserId } = getDisabledInfo(
      user.disabled,
      requestUserId
    )

    const { id } = await prisma.users.create({
      data: {
        ...user,
        createdBy,
        lastUpdatedBy,
        disabledAt,
        lastDisabledBy,
      },
      select: {
        id: true,
      },
    })

    await logsRepository.store("users", {
      action: "insert",
      description: "Registro incluído por usuário",
      referenceId: id,
      userId: logUserId,
    })

    return id
  }

  async findByUsername(username: string) {
    const user = await prisma.users.findUnique({
      where: {
        username,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findAll(onlyEnabled: boolean) {
    const users = await prisma.users.findMany({
      where: {
        disabled: onlyEnabled ? false : undefined,
      },
    })

    return users
  }

  async update({ user, requestUserId, userId }: UpdateUserProps) {
    const { disabledAt, lastDisabledBy, lastUpdatedBy, logUserId } = getDisabledInfo(
      user.disabled,
      requestUserId
    )

    const { id } = await prisma.users.update({
      data: {
        ...user,
        disabledAt,
        lastDisabledBy,
        lastUpdatedBy,
      },
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    })

    await logsRepository.store("users", {
      action: "update",
      description: "Registro atualizado por usuário",
      referenceId: id,
      userId: logUserId,
    })

    return id
  }
}

export default new UsersRepository()
