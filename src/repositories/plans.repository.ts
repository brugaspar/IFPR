import { PrismaClient } from ".prisma/client"

import { getDisabledInfo } from "../helpers/disabled.helper"

import logsRepository from "./logs.repository"

type Plan = {
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

type UpdatePlanProps = {
  plan: Plan
  requestUserId: string
  planId: string
}

const prisma = new PrismaClient()

class PlansRepository {
  async store(plan: Plan, requestUserId: string) {
    const { disabledAt, lastDisabledBy, lastUpdatedBy, createdBy, logUserId } = getDisabledInfo(
      plan.disabled,
      requestUserId
    )

    const { id } = await prisma.plans.create({
      data: {
        ...plan,
        createdBy,
        lastUpdatedBy,
        disabledAt,
        lastDisabledBy,
      },
      select: {
        id: true,
      },
    })

    await logsRepository.store("members_plans", {
      action: "insert",
      description: "Registro incluído por usuário",
      referenceId: id,
      userId: logUserId,
    })

    return id
  }

  async findAll() {
    const plans = await prisma.plans.findMany()

    return plans
  }

  async findById(id: string) {
    const plan = await prisma.plans.findUnique({
      where: {
        id,
      },
    })

    return plan
  }

  async update({ plan, requestUserId, planId }: UpdatePlanProps) {
    const { disabledAt, lastDisabledBy, lastUpdatedBy, logUserId } = getDisabledInfo(
      plan.disabled,
      requestUserId
    )

    const { id } = await prisma.plans.update({
      data: {
        ...plan,
        disabledAt,
        lastDisabledBy,
        lastUpdatedBy,
      },
      where: {
        id: planId,
      },
      select: {
        id: true,
      },
    })

    await logsRepository.store("members_plans", {
      action: "update",
      description: "Registro atualizado por usuário",
      referenceId: id,
      userId: logUserId,
    })

    return id
  }
}

export default new PlansRepository()
