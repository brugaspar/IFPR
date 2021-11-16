import { Request, Response } from "express"
import * as yup from "yup"

import { AppError } from "../handlers/errors.handler"
import { checkBodySchema } from "../handlers/schema.handler"

import { checkRequestUser } from "../helpers/request.helper"

import brandsRepository from "../repositories/brands.repository"

type RequestProductBrand = {
  name: string
  disabled: boolean
}

class ProductsBrandsController {
  async store(request: Request, response: Response) {
    const productBrand: RequestProductBrand = request.body

    const schema = {
      name: yup.string().required("Nome é obrigatório"),
      disabled: yup.boolean(),
    }

    await checkBodySchema(schema, request.body)

    await checkRequestUser(request.userId)

    const storedProductBrand = await brandsRepository.store(productBrand, request.userId)

    return response.status(201).json({ id: storedProductBrand })
  }

  async index(request: Request, response: Response) {
    const { onlyEnabled = true, search = "" } = request.query as any

    await checkRequestUser(request.userId)

    const productsBrands = await brandsRepository.findAll({
      onlyEnabled: JSON.parse(onlyEnabled),
      search,
    })

    return response.status(200).json(productsBrands)
  }

  async show(request: Request, response: Response) {
    const id = request.params.id

    await checkRequestUser(request.userId)

    const productBrand = await brandsRepository.findById(id)

    if (!productBrand) {
      throw new AppError("Marca não encontrada")
    }

    return response.status(200).json(productBrand)
  }

  async update(request: Request, response: Response) {
    const productBrand: RequestProductBrand = request.body

    const id = request.params.id

    const schema = {
      name: yup.string(),
      disabled: yup.boolean(),
    }

    await checkBodySchema(schema, request.body)

    await checkRequestUser(request.userId)

    const productBrandExists = await brandsRepository.findById(id)

    if (!productBrandExists) {
      throw new AppError("Produto não encontrado")
    }

    const updatedProductBrand = await brandsRepository.update({
      productBrand,
      requestUserId: request.userId,
      productBrandId: id,
    })

    return response.status(200).json({ id: updatedProductBrand })
  }
}

export default new ProductsBrandsController()
