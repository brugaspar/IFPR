import { Request, Response } from "express"

import { checkRequestUser } from "../helpers/request.helper"

import permissionsRepository from "../repositories/permissions.repository"

class PermissionsController {
  async index(request: Request, response: Response) {
    await checkRequestUser(request.userId)

    const permissions = await permissionsRepository.findAll()

    return response.status(200).json(permissions)
  }
}

export default new PermissionsController()
