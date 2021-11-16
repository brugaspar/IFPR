import { PrismaClient } from ".prisma/client"
import { Pool } from "pg"

import { getDisabledInfo } from "../helpers/disabled.helper"

import logsRepository from "./logs.repository"

type RequestProductGroup = {
  name: string
  disabled: boolean
}

type ProductGroup = {
  id: string
  name: string
  disabled: boolean
  disabled_at: string
  created_at: string
  updated_at: string
  last_disabled_by: string
  last_updated_by: string
  created_by: string
  disabled_by_user: string
}

type UpdateProductGroupProps = {
  productGroup: RequestProductGroup
  requestUserId: string
  productGroupId: string
}

type FilterProductGroup = {
  onlyEnabled: boolean
  search: string
}

const prisma = new PrismaClient()
const pgPool = new Pool()

class ProductsGroupsRepository {
  async store(productGroup: RequestProductGroup, requestUserId: string) {
    const { disabledAt, lastDisabledBy, lastUpdatedBy, createdBy, logUserId } = getDisabledInfo(
      productGroup.disabled,
      requestUserId
    )

    const { id } = await prisma.productsGroups.create({
      data: {
        ...productGroup,
        createdBy,
        lastUpdatedBy,
        disabledAt,
        lastDisabledBy,
      },
      select: {
        id: true,
      },
    })

    await logsRepository.store("products_groups", {
      action: "insert",
      description: "Registro incluído por usuário",
      referenceId: id,
      userId: logUserId,
    })

    return id
  }

  async findById(id: string) {
    const productGroup = await prisma.productsGroups.findUnique({
      where: {
        id,
      },
    })

    return productGroup
  }

  async findAll({ onlyEnabled = true, search = "" }: FilterProductGroup) {
    const splittedSearch = search.split(" ")

    let searchText = ""

    splittedSearch.forEach((word, index) => {
      searchText += `
        (
          upper(unaccent(pg.name)) like upper(unaccent('%${word}%'))
        )
      `

      if (index !== splittedSearch.length - 1) {
        searchText += "and"
      }
    })

    let whereClause = `
      where
        ${onlyEnabled ? `pg.disabled = false and` : ""}
        ${searchText}
    `

    const pg = await pgPool.connect()

    const query = `
      select
        pg.id,
        pg.name,
        pg.disabled,
        pg.disabled_at,
        pg.created_at,
        pg.updated_at,
        pg.last_disabled_by,
        pg.last_updated_by,
        pg.created_by,
        (select u.name from users u where u.id = pg.last_disabled_by) disabled_by_user
      from
        products_groups pg
      ${whereClause}
    `

    const productsGroups = await pg.query<ProductGroup>(query)

    await pg.release()

    if (!productsGroups) {
      return []
    }

    const parsedProductsBrandsResult = productsGroups.rows.map((product) => {
      const disabledAt = product.disabled_at ? new Date(product.disabled_at).toISOString() : null
      const createdAt = product.created_at ? new Date(product.created_at).toISOString() : null
      const updatedAt = product.updated_at ? new Date(product.updated_at).toISOString() : null

      return {
        id: product.id,
        name: product.name,
        disabled: product.disabled,
        disabledAt,
        createdAt,
        updatedAt,
        lastDisabledBy: product.last_disabled_by,
        lastUpdatedBy: product.last_updated_by,
        createdBy: product.created_by,
        disabledByUser: product.disabled_by_user,
      }
    })

    return parsedProductsBrandsResult
  }

  async update({ productGroup: productBrand, requestUserId, productGroupId: productBrandId }: UpdateProductGroupProps) {
    const { disabledAt, lastDisabledBy, lastUpdatedBy, logUserId } = getDisabledInfo(productBrand.disabled, requestUserId)

    const { id } = await prisma.productsGroups.update({
      data: {
        ...productBrand,
        disabledAt,
        lastDisabledBy,
        lastUpdatedBy,
      },
      where: {
        id: productBrandId,
      },
      select: {
        id: true,
      },
    })

    await logsRepository.store("products_groups", {
      action: "update",
      description: "Registro atualizado por usuário",
      referenceId: id,
      userId: logUserId,
    })

    return id
  }
}

export default new ProductsGroupsRepository()
