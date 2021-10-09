import { PrismaClient } from ".prisma/client"

type User = {
  name: string
  email: string
  password: string
  username: string
  permissions: string[]
  disabled: boolean
}

const prisma = new PrismaClient()

class UserRepository {
  async store(user: User, requestUserId: string) {
    let disabledAt = null
    let lastDisabledBy = null

    if (user.disabled) {
      disabledAt = new Date()
      lastDisabledBy = requestUserId
    }

    const id = await prisma.user.create({
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

  async findAll() {
    const users = await prisma.user.findMany()

    return users
  }
}

export default new UserRepository()
