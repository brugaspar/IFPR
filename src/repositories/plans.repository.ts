import { PrismaClient } from ".prisma/client"
// import { Pool } from "pg"
import { pgPool } from "../configuration/pg.configuration"

import { getDisabledInfo } from "../helpers/disabled.helper"

import logsRepository from "./logs.repository"

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

type Plan = {
  id: string
  name: string
  description: string
  value: number
  renew_value: number
  gun_target_discount: number
  course_discount: number
  shooting_drills_per_year: number
  gun_exemption: boolean
  target_exemption: boolean
  disabled: boolean
  disabled_at: string
  created_at: string
  updated_at: string
  created_by: string
  last_updated_by: string
  last_disabled_by: string
  disabled_by_user: string
}

type UpdatePlanProps = {
  plan: RequestPlan
  requestUserId: string
  planId: string
}

type FilterPlan = {
  onlyEnabled: boolean
  search: string
}

const prisma = new PrismaClient()
// const pgPool = new Pool()

class PlansRepository {
  async store(plan: RequestPlan, requestUserId: string) {
    const { disabledAt, lastDisabledBy, lastUpdatedBy, createdBy, logUserId } = getDisabledInfo(plan.disabled, requestUserId)

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

  async findAll({ onlyEnabled = true, search = "" }: FilterPlan) {
    //? Antigo SELECT, com case-sensitive e considerando acentos
    // const users = await prisma.users.findMany({
    //   where: {
    //     disabled: onlyEnabled ? false : undefined,
    //   },
    //   include: {
    //     disabledByUser: true,
    //   },
    // })

    const splittedSearch = search.split(" ")

    let searchText = ""

    splittedSearch.forEach((word, index) => {
      searchText += `
        (
          upper(unaccent(p.name)) like upper(unaccent('%${word}%'))
        )
      `

      if (index !== splittedSearch.length - 1) {
        searchText += "and"
      }
    })

    let whereClause = `
      where
        ${onlyEnabled ? `p.disabled = false and` : ""}
        ${searchText}
    `

    const pg = await pgPool.connect()

    const query = `
      select
        p.id,
        p.name,
        p.description,
        p.value,
        p.renew_value,
        p.gun_target_discount,
        p.course_discount,
        p.shooting_drills_per_year,
        p.gun_exemption,
        p.target_exemption,
        p.disabled,
        p.disabled_at,
        p.created_at,
        p.updated_at,
        p.last_disabled_by,
        p.last_updated_by,
        p.created_by,
        (select u2.name from users u2 where u2.id = p.last_disabled_by) disabled_by_user
      from
        members_plans p
      ${whereClause}
      order by
        p.created_at
    `

    const plans = await pg.query<Plan>(query)

    await pg.release()

    if (!plans) {
      return []
    }

    const parsedUsersResult = plans.rows.map((plan) => {
      const disabledAt = plan.disabled_at ? new Date(plan.disabled_at).toISOString() : null
      const createdAt = plan.created_at ? new Date(plan.created_at).toISOString() : null
      const updatedAt = plan.updated_at ? new Date(plan.updated_at).toISOString() : null

      return {
        id: plan.id,
        name: plan.name,
        description: plan.description,
        value: plan.value,
        renewValue: plan.renew_value,
        gunTargetDiscount: plan.gun_target_discount,
        courseDiscount: plan.course_discount,
        shootingDrillsPerYear: plan.shooting_drills_per_year,
        gunExemption: plan.gun_exemption,
        targetExemption: plan.target_exemption,
        disabled: plan.disabled,
        disabledAt,
        createdAt,
        updatedAt,
        lastDisabledBy: plan.last_disabled_by,
        lastUpdatedBy: plan.last_updated_by,
        createdBy: plan.created_by,
        disabledByUser: plan.disabled_by_user,
      }
    })

    return parsedUsersResult
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
    const { disabledAt, lastDisabledBy, lastUpdatedBy, logUserId } = getDisabledInfo(plan.disabled, requestUserId)

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
