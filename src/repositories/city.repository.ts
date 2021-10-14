import { PrismaClient } from ".prisma/client"

const prisma = new PrismaClient()

type FilterCity = {
  search: string
}

class CityRepository {
  async findAll({ search }: FilterCity) {
    const cities = await prisma.city.findMany({
      select: {
        id: true,
        name: true,
        state: true,
      },
      where: {
        name: {
          contains: search,
        },
      },
    })

    return cities
  }
}

export default new CityRepository()
