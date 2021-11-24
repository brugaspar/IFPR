import { PrismaClient } from ".prisma/client"

import { pgPool } from "../configuration/pg.configuration"
import { AppError } from "../handlers/errors.handler"
import { getDisabledInfo } from "../helpers/disabled.helper"

import logsRepository from "./logs.repository"
import productsRepository from "./products.repository"

type ActivityStatus = "open" | "closed" | "cancelled"

type RequestActivityItem = {
  activityId: string
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
}

type Activity = {
  id: string
  status: string
  total: string
  total_quantity: string
  total_items: string
  observation: string
  cancelled_reason: string
  seller_id: string
  member_id: string
  created_at: string
  updated_at: string
  last_updated_by: string
  cancelled_by_user: string
  created_by: string
  seller_name: string
  member_name: string
  cancelled_at: string
  product_id: string
  quantity: number
  price: number
  subtotal: number
  finished_at: string
}

type UpdateActivityProps = {
  activity: RequestActivity
  requestUserId: string
  activityId: string
}

type FilterActivity = {
  search: string
  onlyEnabled: boolean
}

const prisma = new PrismaClient()

class ActivitiesRepository {
  async store(activity: RequestActivity, requestUserId: string) {
    const { lastUpdatedBy, createdBy, logUserId } = getDisabledInfo(false, requestUserId)

    const { id } = await prisma.activities.create({
      data: {
        ...activity,
        createdBy,
        lastUpdatedBy,
      },
      select: {
        id: true,
      },
    })

    await logsRepository.store("activities", {
      action: "insert",
      description: "Registro incluído por usuário",
      referenceId: id,
      userId: logUserId,
    })

    return id
  }

  async storeItem(item: RequestActivityItem) {
    const { id } = await prisma.activitiesItems.create({
      data: item,
      select: {
        id: true,
      },
    })

    const product = await productsRepository.findById(item.productId)

    if (!product) {
      throw new AppError("Produto não encontrado")
    }

    const quantity = product.quantity - item.quantity

    await productsRepository.updateQuantity(item.productId, quantity)

    return id
  }

  async deleteItems(activityId: string) {
    const items = await prisma.activitiesItems.findMany({
      where: {
        activityId,
      },
    })

    for (const item of items) {
      const product = await productsRepository.findById(item.productId)

      if (!product) {
        throw new AppError("Produto não encontrado")
      }

      const quantity = product.quantity + item.quantity

      await productsRepository.updateQuantity(item.productId, quantity)
    }

    await prisma.activitiesItems.deleteMany({
      where: {
        activityId,
      },
    })
  }

  async findById(id: string) {
    const activities = await prisma.activities.findUnique({
      where: {
        id,
      },
      include: {
        items: true,
      },
    })

    return activities
  }

  async findAll({ onlyEnabled, search = "" }: FilterActivity) {
    const splittedSearch = search.split(" ")

    let searchText = ""

    splittedSearch.forEach((word, index) => {
      searchText += `
        (
          upper(unaccent(m.name)) like upper(unaccent('%${word}%'))
        )
      `

      if (index !== splittedSearch.length - 1) {
        searchText += "and"
      }
    })

    let whereClause = `
      where
        ${onlyEnabled ? `a.status = 'open' and` : "a.status in ('open', 'closed', 'cancelled') and"}
        ${searchText}
    `

    const pg = await pgPool.connect()

    const query = `
      select
        a.id,
        a.status,
        a.total,
        a.total_quantity,
        a.total_items,
        a.observation,
        a.cancelled_reason,
        a.seller_id,
        u2.name seller_name,
        a.member_id,
        m.name member_name,
        a.created_at,
        a.cancelled_at,
        a.updated_at,
        a.last_updated_by,
        a.created_by,
        a.finished_at,
        (select u.name from users u where u.id = a.last_cancelled_by) cancelled_by_user
      from
        activities a
      left join
        members m on m.id = a.member_id
      left join
        users u2 on u2.id = a.seller_id
      ${whereClause}
      order by
        a.created_at
    `

    const activities = await pg.query<Activity>(query)

    if (!activities) {
      return []
    }

    let items: any[] = []

    for (const activity of activities.rows) {
      const itemsQuery = `
        select
          ai.id,
          ai.product_id,
          ai.quantity,
          ai.price,
          ai.subtotal,
          ai.activity_id
        from
          activities_items ai
        where
          ai.activity_id = '${activity.id}'
      `

      const stored = await pg.query<Activity>(itemsQuery)

      if (!stored) {
        items = []
      } else {
        items.push(stored.rows)
      }
    }

    const parsedActivitiesResult = activities.rows.map((activity) => {
      const cancelledAt = activity.cancelled_at ? new Date(activity.cancelled_at).toISOString() : null
      const createdAt = activity.created_at ? new Date(activity.created_at).toISOString() : null
      const updatedAt = activity.updated_at ? new Date(activity.updated_at).toISOString() : null

      let parsedItems: any[] = []

      items.map((item) => {
        for (const i of item) {
          if (i.activity_id === activity.id) {
            parsedItems.push({
              id: i.id,
              productId: i.product_id,
              quantity: i.quantity,
              price: i.price,
              subtotal: i.subtotal,
            })
          }
        }
      })

      return {
        id: activity.id,
        status: activity.status,
        total: activity.total,
        totalQuantity: activity.total_quantity,
        totalItems: activity.total_items,
        observation: activity.observation,
        cancelledReason: activity.cancelled_reason,
        seller: {
          id: activity.seller_id,
          name: activity.seller_name,
        },
        member: {
          id: activity.member_id,
          name: activity.member_name,
        },
        createdAt,
        updatedAt,
        cancelledAt,
        finishedAt: activity.finished_at,
        lastUpdatedBy: activity.last_updated_by,
        canceledByUser: activity.cancelled_by_user,
        createdBy: activity.created_by,
        items: parsedItems,
      }
    })

    await pg.release()

    return parsedActivitiesResult
  }

  async update({ activity, requestUserId, activityId }: UpdateActivityProps) {
    const { lastUpdatedBy, logUserId } = getDisabledInfo(false, requestUserId)

    let cancelledAt = null
    let finishedAt = null
    let lastCancelledBy = null

    if (activity.status === "cancelled") {
      cancelledAt = new Date()
      lastCancelledBy = requestUserId
    } else if (activity.status === "open") {
      cancelledAt = null
      finishedAt = null
      lastCancelledBy = null
      activity.cancelledReason = ""
    } else if (activity.status === "closed") {
      finishedAt = new Date()
    }

    const { id } = await prisma.activities.update({
      data: {
        ...activity,
        lastUpdatedBy,
        cancelledAt,
        finishedAt,
        lastCancelledBy,
      },
      where: {
        id: activityId,
      },
      select: {
        id: true,
      },
    })

    if (cancelledAt) {
      await logsRepository.store("activities", {
        action: "disable",
        description: "Registro desativado por usuário",
        referenceId: id,
        userId: logUserId,
      })
    } else {
      await logsRepository.store("activities", {
        action: "update",
        description: "Registro atualizado por usuário",
        referenceId: id,
        userId: logUserId,
      })
    }

    return id
  }
}

export default new ActivitiesRepository()
