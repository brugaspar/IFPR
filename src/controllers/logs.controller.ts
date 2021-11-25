import { Request, Response } from "express"

import { checkRequestUser } from "../helpers/request.helper"

import logsRepository from "../repositories/logs.repository"

class LogsController {
  async index(request: Request, response: Response) {
    const { search = "", sort = { name: "", sort: "asc" } } = request.query as any

    let parsedSort = { name: "", sort: "asc" }

    try {
      parsedSort = JSON.parse(sort)
    } catch (error) {
      // ignore
    }

    await checkRequestUser(request.userId)

    const logs = await logsRepository.findAll({ search, sort: parsedSort })

    return response.status(200).json(logs)
  }
}

export default new LogsController()
