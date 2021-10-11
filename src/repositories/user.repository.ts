import { PrismaClient } from ".prisma/client"
import { getDisabledInfo } from "../helpers/disabled.helper"
import logRepository from "./log.repository"

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

class UserRepository {
  async store(user: User, requestUserId: string) {
    const { disabledAt, lastDisabledBy } = getDisabledInfo(user.disabled, requestUserId)

    const { id } = await prisma.user.create({
      data: {
        ...user,
        createdBy: requestUserId,
        lastUpdatedBy: requestUserId,
        disabledAt,
        lastDisabledBy,
      },
      select: {
        id: true,
      },
    })

    await logRepository.store("user", {
      action: "insert",
      description: "Registro incluído por usuário",
      referenceId: id,
      userId: requestUserId,
    })

    return id
  }

  async findByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findAll(onlyEnabled: boolean) {
    const users = await prisma.user.findMany({
      where: {
        disabled: onlyEnabled ? false : undefined,
      },
    })

    return users
  }

  async update({ user, requestUserId, userId }: UpdateUserProps) {
    const { createdBy, disabledAt, lastDisabledBy, lastUpdatedBy } = getDisabledInfo(
      user.disabled,
      requestUserId
    )

    const { id } = await prisma.user.update({
      data: {
        ...user,
        createdBy,
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

    await logRepository.store("user", {
      action: "update",
      description: "Registro atualizado por usuário",
      referenceId: id,
      userId: requestUserId,
    })

    return id
  }
}

export default new UserRepository()
