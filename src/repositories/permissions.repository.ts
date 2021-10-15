import { PrismaClient } from ".prisma/client"

const prisma = new PrismaClient()

class PermissionsRepository {
  async findAll() {
    const permissions = await prisma.permissions.findMany()

    return permissions
  }
}

export default new PermissionsRepository()
