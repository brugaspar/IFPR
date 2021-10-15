import { PrismaClient } from ".prisma/client"

import tablesRepository from "./tables.repository"

type Action = "insert" | "update" | "disable" | "sign_in_error"

type Log = {
  description: string
  action: Action
  referenceId: string
  userId?: string
}

const prisma = new PrismaClient()

class LogsRepository {
  async store(tableName: string, log: Log) {
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
}

export default new LogsRepository()
