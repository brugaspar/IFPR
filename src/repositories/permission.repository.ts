import { PrismaClient } from ".prisma/client"

const prisma = new PrismaClient()

class PermissionRepository {
  async findAll() {
    const permissions = await prisma.permissions.findMany()

    return permissions
  }
}

export default new PermissionRepository()
