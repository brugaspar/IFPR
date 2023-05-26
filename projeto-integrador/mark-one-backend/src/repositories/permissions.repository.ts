import { PrismaClient } from ".prisma/client"

const prisma = new PrismaClient()

type FilterPermission = {
  tableId?: string
}

class PermissionsRepository {
  async findAll({ tableId }: FilterPermission) {
    const permissions = await prisma.permissions.findMany({
      where: {
        tableId: tableId ? tableId : undefined,
      },
    })

    return permissions
  }
}

export default new PermissionsRepository()
