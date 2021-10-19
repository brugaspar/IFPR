import { Request, Response } from "express"

import { checkRequestUser } from "../helpers/request.helper"

import citiesRepository from "../repositories/cities.repository"

type FilterCity = {
  search: string
}

class CitiesController {
  async index(request: Request, response: Response) {
    const { search }: FilterCity = request.query as any

    await checkRequestUser(request.userId)

    const cities = await citiesRepository.findAll({
      search,
    })

    return response.status(200).json(cities)
  }
}

export default new CitiesController()
