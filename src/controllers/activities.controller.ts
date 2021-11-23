import { Request, Response } from "express"
import * as yup from "yup"

import { AppError } from "../handlers/errors.handler"
import { checkBodySchema } from "../handlers/schema.handler"

import { checkRequestUser } from "../helpers/request.helper"

import activitiesRepository from "../repositories/activities.repository"

type ActivityStatus = "open" | "in_progress" | "closed" | "cancelled"

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
      status: yup.string().required(),
      total: yup.number().required(),
      totalQuantity: yup.number().required(),
      totalItems: yup.number().required(),
      observation: yup.string(),
      cancelledReason: yup.string(),
      sellerId: yup.string().required(),
      memberId: yup.string().required(),
      finishedAt: yup.string(),
      items: yup.array(
        yup.object().shape({
          productId: yup.string().required(),
          quantity: yup.number().required(),
          price: yup.number().required(),
        })
      ),
    }

    await checkBodySchema(schema, request.body)

    await checkRequestUser(request.userId)

    const parsedActivity = {
      ...activity,
      items: undefined,
    }

    const storedActivity = await activitiesRepository.store(parsedActivity, request.userId)

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
    const { search = "" } = request.query as any

    await checkRequestUser(request.userId)

    const activities = await activitiesRepository.findAll({
      search,
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
      total: yup.number(),
      totalQuantity: yup.number(),
      totalItems: yup.number(),
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

    const updatedActivity = await activitiesRepository.update({
      activity: parsedActivity,
      requestUserId: request.userId,
      activityId: id,
    })

    // if (activity.items) {
    //   for (const item of activity.items) {
    //     await activitiesRepository.updateItem(
    //       {
    //         price: item.price,
    //         quantity: item.quantity,
    //         subtotal: item.price * item.quantity,
    //       },
    //       item.id || ""
    //     )
    //   }
    // }

    return response.status(200).json({ id: updatedActivity })
  }
}

export default new ActivitiesController()
