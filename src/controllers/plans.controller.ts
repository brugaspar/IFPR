import { Request, Response } from "express"
import * as yup from "yup"

import { AppError } from "../handlers/errors.handler"
import { checkBodySchema } from "../handlers/schema.handler"

import { checkRequestUser } from "../helpers/request.helper"

import plansRepository from "../repositories/plans.repository"

type RequestPlan = {
  name: string
  description: string
  value: number
  renewValue: number
  gunTargetDiscount: number
  courseDiscount: number
  shootingDrillsPerYear: number
  gunExemption: boolean
  targetExemption: boolean
  disabled: boolean
}

class PlansController {
  async store(request: Request, response: Response) {
    const plan: RequestPlan = request.body

    const schema = {
      name: yup.string().required("Nome é obrigatório"),
      description: yup.string(),
      value: yup.number().required("Valor é obrigatório"),
      renewValue: yup.number().required("Valor de renovação é obrigatório"),
      gunTargetDiscount: yup.number().required("Desconto de armas e alvos é obrigatório"),
      courseDiscount: yup.number().required("Desconto de cursos é obrigatório"),
      shootingDrillsPerYear: yup.number().required("Qtde. de treinos de tiro por ano é obrigatório"),
      gunExemption: yup.boolean().required("Isenção de aluguel de armas é obrigatório"),
      targetExemption: yup.boolean().required("Isenção de aluguel de alvos é obrigatório"),
      disabled: yup.boolean(),
    }

    await checkBodySchema(schema, request.body)

    await checkRequestUser(request.userId)

    const storedPlan = await plansRepository.store(plan, request.userId)

    return response.status(201).json({ id: storedPlan })
  }

  async index(request: Request, response: Response) {
    await checkRequestUser(request.userId)

    const plans = await plansRepository.findAll()

    return response.status(200).json(plans)
  }

  async show(request: Request, response: Response) {
    const id = request.params.id

    await checkRequestUser(request.userId)

    const plan = await plansRepository.findById(id)

    if (!plan) {
      throw new AppError("Plano não encontrado")
    }

    return response.status(200).json(plan)
  }

  async update(request: Request, response: Response) {
    const plan: RequestPlan = request.body

    const id = request.params.id

    const schema = {
      name: yup.string(),
      description: yup.string(),
      value: yup.number(),
      renewValue: yup.number(),
      gunTargetDiscount: yup.number(),
      courseDiscount: yup.number(),
      shootingDrillsPerYear: yup.number(),
      gunExemption: yup.boolean(),
      targetExemption: yup.boolean(),
      disabled: yup.boolean(),
    }

    await checkBodySchema(schema, request.body)

    await checkRequestUser(request.userId)

    const updatedPlan = await plansRepository.update({
      plan,
      requestUserId: request.userId,
      planId: id,
    })

    return response.status(200).json({ id: updatedPlan })
  }
}

export default new PlansController()
