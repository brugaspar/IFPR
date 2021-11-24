import { Request, Response } from "express"

import { checkRequestUser } from "../helpers/request.helper"

import logsRepository from "../repositories/logs.repository"

class LogsController {
  async index(request: Request, response: Response) {
    const { search = "" } = request.query as any

    await checkRequestUser(request.userId)

    const logs = await logsRepository.findAll({ search })

    return response.status(200).json(logs)
  }
}

export default new LogsController()
