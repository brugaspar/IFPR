import { PrismaClient } from ".prisma/client"
import { Pool } from "pg"

import { getDisabledInfo } from "../helpers/disabled.helper"

import logsRepository from "./logs.repository"

type RequestProductBrand = {
  name: string
  disabled: boolean
}

type ProductBrand = {
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

type UpdateProductBrandProps = {
  productBrand: RequestProductBrand
  requestUserId: string
  productBrandId: string
}

type FilterProductBrand = {
  onlyEnabled: boolean
  search: string
}

const prisma = new PrismaClient()
const pgPool = new Pool()

class ProductsBrandsRepository {
  async store(productBrand: RequestProductBrand, requestUserId: string) {
    const { disabledAt, lastDisabledBy, lastUpdatedBy, createdBy, logUserId } = getDisabledInfo(
      productBrand.disabled,
      requestUserId
    )

    const { id } = await prisma.productsBrands.create({
      data: {
        ...productBrand,
        createdBy,
        lastUpdatedBy,
        disabledAt,
        lastDisabledBy,
      },
      select: {
        id: true,
      },
    })

    await logsRepository.store("products_brands", {
      action: "insert",
      description: "Registro incluído por usuário",
      referenceId: id,
      userId: logUserId,
    })

    return id
  }

  async findById(id: string) {
    const productBrand = await prisma.productsBrands.findUnique({
      where: {
        id,
      },
    })

    return productBrand
  }

  async findAll({ onlyEnabled = true, search = "" }: FilterProductBrand) {
    const splittedSearch = search.split(" ")

    let searchText = ""

    splittedSearch.forEach((word, index) => {
      searchText += `
        (
          upper(unaccent(pb.name)) like upper(unaccent('%${word}%'))
        )
      `

      if (index !== splittedSearch.length - 1) {
        searchText += "and"
      }
    })

    let whereClause = `
      where
        ${onlyEnabled ? `pb.disabled = false and` : ""}
        ${searchText}
    `

    const pg = await pgPool.connect()

    const query = `
      select
        pb.id,
        pb.name,
        pb.disabled,
        pb.disabled_at,
        pb.created_at,
        pb.updated_at,
        pb.last_disabled_by,
        pb.last_updated_by,
        pb.created_by,
        (select u.name from users u where u.id = pb.last_disabled_by) disabled_by_user
      from
        products_brands pb
      ${whereClause}
    `

    const productsBrands = await pg.query<ProductBrand>(query)

    await pg.release()

    if (!productsBrands) {
      return []
    }

    const parsedProductsBrandsResult = productsBrands.rows.map((product) => {
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

  async update({ productBrand, requestUserId, productBrandId }: UpdateProductBrandProps) {
    const { disabledAt, lastDisabledBy, lastUpdatedBy, logUserId } = getDisabledInfo(productBrand.disabled, requestUserId)

    const { id } = await prisma.productsBrands.update({
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

    await logsRepository.store("products_brands", {
      action: "update",
      description: "Registro atualizado por usuário",
      referenceId: id,
      userId: logUserId,
    })

    return id
  }
}

export default new ProductsBrandsRepository()
