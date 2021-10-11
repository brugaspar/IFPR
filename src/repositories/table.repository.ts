import { PrismaClient } from ".prisma/client"

const prisma = new PrismaClient()

class TableRepository {
  async findByName(name: string) {
    const id = await prisma.table.findUnique({
      where: {
        name,
      },
      select: {
        id: true,
      },
    })

    return id
  }
}

export default new TableRepository()
