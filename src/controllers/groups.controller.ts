import { Request, Response } from "express"
import * as yup from "yup"

import { AppError } from "../handlers/errors.handler"
import { checkBodySchema } from "../handlers/schema.handler"

import { checkRequestUser } from "../helpers/request.helper"

import groupsRepository from "../repositories/groups.repository"

type RequestProductGroup = {
  name: string
  disabled: boolean
}

class ProductsGroupsController {
  async store(request: Request, response: Response) {
    const productGroup: RequestProductGroup = request.body

    const schema = {
      name: yup.string().required("Nome é obrigatório"),
      disabled: yup.boolean(),
    }

    await checkBodySchema(schema, request.body)

    await checkRequestUser(request.userId)

    const storedProductGroup = await groupsRepository.store(productGroup, request.userId)

    return response.status(201).json({ id: storedProductGroup })
  }

  async index(request: Request, response: Response) {
    const { onlyEnabled = true, search = "" } = request.query as any

    await checkRequestUser(request.userId)

    const productsGroups = await groupsRepository.findAll({
      onlyEnabled: JSON.parse(onlyEnabled),
      search,
    })

    return response.status(200).json(productsGroups)
  }

  async show(request: Request, response: Response) {
    const id = request.params.id

    await checkRequestUser(request.userId)

    const productGroup = await groupsRepository.findById(id)

    if (!productGroup) {
      throw new AppError("Grupo não encontrado")
    }

    return response.status(200).json(productGroup)
  }

  async update(request: Request, response: Response) {
    const productGroup: RequestProductGroup = request.body

    const id = request.params.id

    const schema = {
      name: yup.string(),
      disabled: yup.boolean(),
    }

    await checkBodySchema(schema, request.body)

    await checkRequestUser(request.userId)

    const productGroupExists = await groupsRepository.findById(id)

    if (!productGroupExists) {
      throw new AppError("Produto não encontrado")
    }

    const updatedProductGroup = await groupsRepository.update({
      productGroup,
      requestUserId: request.userId,
      productGroupId: id,
    })

    return response.status(200).json({ id: updatedProductGroup })
  }
}

export default new ProductsGroupsController()
