import { Request, Response } from "express"
import * as yup from "yup"

import { AppError } from "../handlers/errors.handler"
import { checkBodySchema } from "../handlers/schema.handler"

import { checkRequestUser } from "../helpers/request.helper"

import activitiesRepository from "../repositories/activities.repository"
import productsRepository from "../repositories/products.repository"

type ActivityStatus = "open" | "closed" | "cancelled"

type RequestActivityItem = {
  productId: string
  quantity: number
  price: number
  subtotal: number
}

type RequestActivity = {
  status: ActivityStatus
  total: number
  totalQuantity: number
  totalItems: number
  observation: string
  cancelledReason: string
  sellerId: string
  memberId: string
  finishedAt: string
  items: RequestActivityItem[]
}

class ActivitiesController {
  async store(request: Request, response: Response) {
    const activity: RequestActivity = request.body

    const schema = {
      status: yup.string().required("Status é obrigatório"),
      observation: yup.string(),
      cancelledReason: yup.string(),
      sellerId: yup.string().required("Vendedor é obrigatório"),
      memberId: yup.string().required("Membro é obrigatório"),
      finishedAt: yup.string(),
      items: yup.array(
        yup.object().shape({
          productId: yup.string().required("Produto é obrigatório"),
          quantity: yup.number().required("Quantidade é obrigatória"),
          price: yup.number().required("Preço é obrigatório"),
        })
      ),
    }

    await checkBodySchema(schema, request.body)

    await checkRequestUser(request.userId)

    const parsedActivity = {
      ...activity,
      items: undefined,
    }

    let activityTotal = 0
    let activityTotalQuantity = 0
    let activityTotalItems = 0

    if (activity.items) {
      activityTotal = activity.items.reduce((accumulator, item) => (accumulator += item.price * item.quantity), 0)
      activityTotalQuantity = activity.items.reduce((accumulator, item) => (accumulator += item.quantity), 0)
      activityTotalItems = activity.items.length
    }

    const storedActivity = await activitiesRepository.store(
      {
        ...parsedActivity,
        total: activityTotal,
        totalItems: activityTotalItems,
        totalQuantity: activityTotalQuantity,
      },
      request.userId
    )

    for (const item of activity.items) {
      await activitiesRepository.storeItem({
        ...item,
        activityId: storedActivity,
        subtotal: item.price * item.quantity,
      })
    }

    return response.status(201).json({ id: storedActivity })
  }

  async index(request: Request, response: Response) {
    const { onlyEnabled = true, search = "", sort = { name: "", sort: "asc" } } = request.query as any

    const parsedOnlyEnabled = onlyEnabled ? JSON.parse(onlyEnabled) : true

    let parsedSort = { name: "", sort: "asc" }

    try {
      parsedSort = JSON.parse(sort)
    } catch (error) {
      // ignore
    }

    await checkRequestUser(request.userId)

    const activities = await activitiesRepository.findAll({
      search,
      onlyEnabled: parsedOnlyEnabled,
      sort: parsedSort,
    })

    return response.status(200).json(activities)
  }

  async show(request: Request, response: Response) {
    const id = request.params.id

    await checkRequestUser(request.userId)

    const activity = await activitiesRepository.findById(id)

    if (!activity) {
      throw new AppError("Atividade não encontrada")
    }

    return response.status(200).json(activity)
  }

  async update(request: Request, response: Response) {
    const activity: RequestActivity = request.body

    const id = request.params.id

    const schema = {
      status: yup.string(),
      observation: yup.string(),
      cancelledReason: yup.string(),
      sellerId: yup.string(),
      memberId: yup.string(),
      finishedAt: yup.string(),
      items: yup.array(
        yup.object().shape({
          productId: yup.string(),
          quantity: yup.number(),
          price: yup.number(),
        })
      ),
    }

    await checkBodySchema(schema, request.body)

    await checkRequestUser(request.userId)

    const activityExists = await activitiesRepository.findById(id)

    if (!activityExists) {
      throw new AppError("Atividade não encontrado")
    }

    const parsedActivity = {
      ...activity,
      items: undefined,
    }

    if (activity.items) {
      const activityTotal = activity.items.reduce((accumulator, item) => (accumulator += item.price * item.quantity), 0)
      const activityTotalQuantity = activity.items.reduce((accumulator, item) => (accumulator += item.quantity), 0)
      const activityTotalItems = activity.items.length

      parsedActivity.total = activityTotal
      parsedActivity.totalQuantity = activityTotalQuantity
      parsedActivity.totalItems = activityTotalItems
    }

    const updatedActivity = await activitiesRepository.update({
      activity: {
        ...parsedActivity,
      },
      requestUserId: request.userId,
      activityId: id,
    })

    if (activity.items) {
      await activitiesRepository.deleteItems(id)

      for (const item of activity.items) {
        await activitiesRepository.storeItem({
          ...item,
          activityId: id,
          subtotal: item.price * item.quantity,
        })
      }
    }

    if (activity.status === "cancelled") {
      for (const item of activity.items) {
        const product = await productsRepository.findById(item.productId)

        if (!product) {
          throw new AppError("Produto não encontrado")
        }

        const quantity = product.quantity + item.quantity

        await productsRepository.updateQuantity(item.productId, quantity)
      }
    } else {
      for (const item of activity.items) {
        const product = await productsRepository.findById(item.productId)

        if (!product) {
          throw new AppError("Produto não encontrado")
        }

        const quantity = product.quantity - item.quantity

        await productsRepository.updateQuantity(item.productId, quantity)
      }
    }

    return response.status(200).json({ id: updatedActivity })
  }
}

export default new ActivitiesController()
