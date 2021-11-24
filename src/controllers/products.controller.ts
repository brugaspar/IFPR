import { Request, Response } from "express"
import * as yup from "yup"

import { AppError } from "../handlers/errors.handler"
import { checkBodySchema } from "../handlers/schema.handler"

import { checkRequestUser } from "../helpers/request.helper"

import productsRepository from "../repositories/products.repository"

type RequestProduct = {
  name: string
  quantity: number
  minimumQuantity: number
  price: number
  brandId: string
  groupId: string
  disabled: boolean
  isService: boolean
}

class ProductsController {
  async store(request: Request, response: Response) {
    const product: RequestProduct = request.body

    const schema = {
      name: yup.string().required("Nome é obrigatório"),
      quantity: yup.number().required("Quantidade é obrigatória"),
      minimumQuantity: yup.number(),
      price: yup.number().required("Preço é obrigatório"),
      brandId: yup.string().required("Marca é obrigatória"),
      groupId: yup.string().required("Grupo é obrigatório"),
      disabled: yup.boolean(),
      isService: yup.boolean(),
    }

    await checkBodySchema(schema, request.body)

    await checkRequestUser(request.userId)

    const storedProduct = await productsRepository.store(product, request.userId)

    return response.status(201).json({ id: storedProduct })
  }

  async index(request: Request, response: Response) {
    const { onlyEnabled = true, search = "" } = request.query as any

    await checkRequestUser(request.userId)

    const products = await productsRepository.findAll({
      onlyEnabled: JSON.parse(onlyEnabled),
      search,
    })

    return response.status(200).json(products)
  }

  async show(request: Request, response: Response) {
    const id = request.params.id

    await checkRequestUser(request.userId)

    const product = await productsRepository.findById(id)

    if (!product) {
      throw new AppError("Produto não encontrada")
    }

    return response.status(200).json(product)
  }

  async update(request: Request, response: Response) {
    const product: RequestProduct = request.body

    const id = request.params.id

    const schema = {
      name: yup.string(),
      quantity: yup.number(),
      minimumQuantity: yup.number(),
      price: yup.number(),
      brandId: yup.string(),
      groupId: yup.string(),
      disabled: yup.boolean(),
    }

    await checkBodySchema(schema, request.body)

    await checkRequestUser(request.userId)

    const productExists = await productsRepository.findById(id)

    if (!productExists) {
      throw new AppError("Produto não encontrado")
    }

    const updatedProduct = await productsRepository.update({
      product,
      requestUserId: request.userId,
      productId: id,
    })

    return response.status(200).json({ id: updatedProduct })
  }
}

export default new ProductsController()
