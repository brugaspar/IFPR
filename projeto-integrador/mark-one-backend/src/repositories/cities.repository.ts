import { PrismaClient } from ".prisma/client"

const prisma = new PrismaClient()

type FilterCity = {
  search: string
}

type City = {
  id: number
  name: string
  state_id: number
  state_name: string
  state_initials: string
}

class CitiesRepository {
  async findAll({ search }: FilterCity) {
    const cities = await prisma.$queryRaw<City[]>`
      select
        c.id,
        c.name,
        s.id state_id,
        s.name state_name,
        s.initials state_initials
      from
        cities c
      inner join
        states s on s.id = c.state_id
      where
        upper(unaccent(c.name)) like upper(unaccent(${`%${search}%`}))
    `

    const parsedCities = cities.map((city) => {
      return {
        id: city.id,
        name: city.name,
        state: {
          id: city.state_id,
          name: city.state_name,
          initials: city.state_initials,
        },
      }
    })

    return parsedCities
  }
}

export default new CitiesRepository()
