import { Request, Response } from "express"

import cityRepository from "../repositories/city.repository"

type FilterCity = {
  search: string
}

class CityController {
  async index(request: Request, response: Response) {
    const { search }: FilterCity = request.query as any

    const cities = await cityRepository.findAll({
      search,
    })

    return response.status(200).json(cities)
  }
}

export default new CityController()
