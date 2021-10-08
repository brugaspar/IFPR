import { PrismaClient } from ".prisma/client"

const prisma = new PrismaClient()

class PermissionRepository {
  async findAll() {
    const permissions = await prisma.permission.findMany()

    return permissions
  }
}

export default new PermissionRepository()
