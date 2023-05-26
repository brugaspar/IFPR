import { PrismaClient } from ".prisma/client"

import { pgPool } from "../configuration/pg.configuration"

import tablesRepository from "./tables.repository"

type Action = "insert" | "update" | "disable" | "sign_in_error" | "delete"

type RequestLog = {
  description: string
  action: Action
  referenceId: string
  userId?: string
}

type Log = {
  id: string
  description: string
  action: string
  reference_id: string
  user_id: string
  user_name: string
  table_id: string
  table_name: string
  created_at: string
}

type FilterLog = {
  search: string
  sort: {
    name: string
    sort: string
  }
}

const prisma = new PrismaClient()

class LogsRepository {
  async store(tableName: string, log: RequestLog) {
    const table = await tablesRepository.findByName(tableName)

    if (!table) {
      throw new Error(`Tabela inexistente: ${tableName}`)
    }

    await prisma.logs.create({
      data: {
        ...log,
        tableId: table.id,
      },
    })
  }

  async findAll({ search = "", sort }: FilterLog) {
    const splittedSearch = search.split(" ")

    let searchText = ""

    splittedSearch.forEach((word, index) => {
      searchText += `
        (
          upper(unaccent(gl.description)) like upper(unaccent('%${word}%'))
          or
          upper(unaccent(u.name)) like upper(unaccent('%${word}%'))
          or
          upper(unaccent(gt.name)) like upper(unaccent('%${word}%'))
        )
      `

      if (index !== splittedSearch.length - 1) {
        searchText += "and"
      }
    })

    let whereClause = `
      where
        ${searchText}
    `

    const pg = await pgPool.connect()

    let orderClause = ""

    if (sort.name) {
      if (sort.name === "user") {
        orderClause = `
          order by
            u.name ${sort.sort}
        `
      } else if (sort.name === "table") {
        orderClause = `
          order by
            gt.name ${sort.sort}
        `
      } else {
        orderClause = `
          order by
            gl.${sort.name} ${sort.sort}
        `
      }
    } else {
      orderClause = `
        order by
          gl.created_at desc
      `
    }

    const query = `
      select
        gl.id,
        gl.description,
        gl.action,
        gl.created_at,
        gl.table_id,
        gt.name table_name,
        gl.user_id,
        u.name user_name
      from
        general_logs gl
      left join
        users u on u.id = gl.user_id
      left join
        general_tables gt on gt.id = gl.table_id
      ${whereClause}
      ${orderClause}
    `

    const logs = await pg.query<Log>(query)

    await pg.release()

    if (!logs) {
      return []
    }

    const parsedLogsResult = logs.rows.map((log) => {
      const createdAt = log.created_at ? new Date(log.created_at).toISOString() : null

      return {
        id: log.id,
        description: log.description,
        action: log.action,
        createdAt,
        table: {
          id: log.table_id,
          name: log.table_name,
        },
        user: {
          id: log.user_id,
          name: log.user_name,
        },
      }
    })

    return parsedLogsResult
  }
}

export default new LogsRepository()
