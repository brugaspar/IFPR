import { PrismaClient } from ".prisma/client"

import { getDisabledInfo } from "../helpers/disabled.helper"

import logsRepository from "./logs.repository"

type FileDocument = {
  name: string
  path: string
  validity?: string
  memberId: string
}

type UpdateFileDocumentProps = {
  document: FileDocument
  requestUserId: string
  documentId: string
}

const prisma = new PrismaClient()

class DocumentsRepository {
  async store(document: FileDocument, requestUserId: string) {
    const { lastUpdatedBy, createdBy, logUserId } = getDisabledInfo(false, requestUserId)

    const { id } = await prisma.membersDocuments.create({
      data: {
        ...document,
        createdBy,
        lastUpdatedBy,
      },
      select: {
        id: true,
      },
    })

    await logsRepository.store("members_documents", {
      action: "insert",
      description: "Registro incluído por usuário",
      referenceId: id,
      userId: logUserId,
    })

    return id
  }
}

export default new DocumentsRepository()
