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

type UpdateMemberProps = {
  member: Member
  requestUserId: string
  memberId: string
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

  async findAll(onlyEnabled: boolean) {
    const members = await prisma.members.findMany({
      where: {
        disabled: onlyEnabled ? false : undefined,
      },
      select: {
        id: true,
        name: true,
        rg: true,
        issuingAuthority: true,
        cpf: true,
        motherName: true,
        fatherName: true,
        profession: true,
        email: true,
        phone: true,
        cellPhone: true,
        crNumber: true,
        crValidity: true,
        healthIssues: true,
        gender: true,
        maritalStatus: true,
        bloodTyping: true,
        disabled: true,
        disabledAt: true,
        createdAt: true,
        updatedAt: true,
        lastDisabledBy: true,
        lastUpdatedBy: true,
        planId: true,
        city: true,
        memberAddresses: true,
      },
    })

    return members
  }

  async findById(id: string) {
    const member = await prisma.members.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        rg: true,
        issuingAuthority: true,
        cpf: true,
        motherName: true,
        fatherName: true,
        profession: true,
        email: true,
        phone: true,
        cellPhone: true,
        crNumber: true,
        crValidity: true,
        healthIssues: true,
        gender: true,
        maritalStatus: true,
        bloodTyping: true,
        disabled: true,
        disabledAt: true,
        createdAt: true,
        updatedAt: true,
        lastDisabledBy: true,
        lastUpdatedBy: true,
        planId: true,
        city: true,
      },
    })

    return member
  }

  async findByEmail(email: string) {
    const member = await prisma.members.findUnique({
      where: {
        email,
      },
    })

    return member
  }

  async update({ member, requestUserId, memberId }: UpdateMemberProps) {
    const { disabledAt, lastDisabledBy, lastUpdatedBy, logUserId } = getDisabledInfo(
      member.disabled,
      requestUserId
    )

    const { id } = await prisma.members.update({
      data: {
        ...member,
        disabledAt,
        lastDisabledBy,
        lastUpdatedBy,
      },
      where: {
        id: memberId,
      },
      select: {
        id: true,
      },
    })

    await logsRepository.store("members", {
      action: "update",
      description: "Registro atualizado por usuário",
      referenceId: id,
      userId: logUserId,
    })

    return id
  }

  async findAllDocuments(memberId: string) {
    const memberDocuments = await prisma.members.findUnique({
      where: {
        id: memberId,
      },
      select: {
        memberDocuments: true,
      },
    })

    return memberDocuments
  }
}

export default new MembersRepository()
