import { Request, Response } from "express"

import { checkRequestUser } from "../helpers/request.helper"

import permissionsRepository from "../repositories/permissions.repository"

type FilterPermission = {
  tableId: string
}

class PermissionsController {
  async index(request: Request, response: Response) {
    const { tableId }: FilterPermission = request.query as any

    await checkRequestUser(request.userId)

    const permissions = await permissionsRepository.findAll({
      tableId,
    })

    return response.status(200).json(permissions)
  }
}

export default new PermissionsController()
