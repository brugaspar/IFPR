import { PrismaClient } from ".prisma/client"

import { getDisabledInfo } from "../helpers/disabled.helper"

import logsRepository from "./logs.repository"

type Gender = "male" | "female" | "other"
type MaritalStatus = "single" | "married" | "widower" | "legally_separated" | "divorced"
type BloodTyping =
  | "APositive"
  | "ANegative"
  | "BPositive"
  | "BNegative"
  | "ABPositive"
  | "ABNegative"
  | "OPositive"
  | "ONegative"

type Member = {
  name: string
  rg: string
  issuingAuthority: string
  cpf: string
  naturalityCityId: number
  motherName: string
  fatherName: string
  profession: string
  email: string
  phone: string
  cellPhone: string
  crNumber: string
  issuedAt: string
  birthDate: string
  crValidity: string
  healthIssues: string
  gender: Gender
  maritalStatus: MaritalStatus
  bloodTyping: BloodTyping
  disabled: boolean
  planId: string
}

const prisma = new PrismaClient()

class MembersRepository {
  async store(member: Member, requestUserId: string) {
    const { disabledAt, lastDisabledBy, lastUpdatedBy, createdBy, logUserId } = getDisabledInfo(
      member.disabled,
      requestUserId
    )

    const { id } = await prisma.members.create({
      data: {
        ...member,
        createdBy,
        lastUpdatedBy,
        disabledAt,
        lastDisabledBy,
      },
      select: {
        id: true,
      },
    })

    await logsRepository.store("members", {
      action: "insert",
      description: "Registro incluído por usuário",
      referenceId: id,
      userId: logUserId,
    })

    return id
  }
}

export default new MembersRepository()
