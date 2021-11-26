import { PrismaClient } from ".prisma/client"

import { pgPool } from "../configuration/pg.configuration"
import { getDisabledInfo } from "../helpers/disabled.helper"

import logsRepository from "./logs.repository"

type Gender = "male" | "female" | "other"
type MaritalStatus = "single" | "married" | "widower" | "legally_separated" | "divorced"
type BloodTyping = "APositive" | "ANegative" | "BPositive" | "BNegative" | "ABPositive" | "ABNegative" | "OPositive" | "ONegative"

type RequestMember = {
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

type Member = {
  id: string
  name: string
  rg: string
  issuing_authority: string
  cpf: string
  naturality_city_id: number
  mother_name: string
  father_name: string
  profession: string
  email: string
  phone: string
  cell_phone: string
  cr_number: string
  issued_at: string
  birth_date: string
  cr_validity: string
  health_issues: string
  gender: Gender
  marital_status: MaritalStatus
  blood_typing: BloodTyping
  disabled: boolean
  plan_id: string
  disabled_at: string
  created_at: string
  updated_at: string
  disabled_by_user: string
  last_disabled_by: string
  last_updated_by: string
  created_by: string
}

type UpdateMemberProps = {
  member: RequestMember
  requestUserId: string
  memberId: string
}

type FilterMember = {
  onlyEnabled: boolean
  search: string
  sort: {
    name: string
    sort: string
  }
}

const prisma = new PrismaClient()

class MembersRepository {
  async store(member: RequestMember, requestUserId: string) {
    const { disabledAt, lastDisabledBy, lastUpdatedBy, createdBy, logUserId } = getDisabledInfo(member.disabled, requestUserId)

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

  async findAll({ onlyEnabled = true, search = "", sort }: FilterMember) {
    const splittedSearch = search.split(" ")

    let searchText = ""

    splittedSearch.forEach((word, index) => {
      searchText += `
        (
          upper(unaccent(m.name)) like upper(unaccent('%${word}%'))
          or
          upper(unaccent(m.email)) like upper(unaccent('%${word}%'))
        )
      `

      if (index !== splittedSearch.length - 1) {
        searchText += "and"
      }
    })

    let whereClause = `
      where
        ${onlyEnabled ? `m.disabled = false and` : ""}
        ${searchText}
    `

    const pg = await pgPool.connect()

    let orderClause = ""

    if (sort.name) {
      orderClause = `
        order by
          m.${sort.name} ${sort.sort}
      `
    } else {
      orderClause = `
        order by
          m.created_at
      `
    }

    const query = `
      select
        m.id,
        m.name,
        m.rg,
        m.issuing_authority,
        m.cpf,
        m.mother_name,
        m.father_name,
        m.profession,
        m.email,
        m.phone,
        m.cell_phone,
        m.cr_number,
        m.cr_validity,
        m.health_issues,
        m.gender,
        m.marital_status,
        m.blood_typing,
        m.disabled,
        m.naturality_city_id,
        m.issued_at,
        m.birth_date,
        m.disabled_at,
        m.created_at,
        m.updated_at,
        m.last_disabled_by,
        m.last_updated_by,
        m.created_by,
        (select u.name from users u where u.id = m.last_disabled_by) disabled_by_user
      from
        members m
      ${whereClause}
      ${orderClause}
    `

    const members = await pg.query<Member>(query)

    await pg.release()

    if (!members) {
      return []
    }

    const parsedMembersResult = members.rows.map((member) => {
      const disabledAt = member.disabled_at ? new Date(member.disabled_at).toISOString() : null
      const createdAt = member.created_at ? new Date(member.created_at).toISOString() : null
      const updatedAt = member.updated_at ? new Date(member.updated_at).toISOString() : null

      return {
        id: member.id,
        name: member.name,
        rg: member.rg,
        issuingAuthority: member.issuing_authority,
        cpf: member.cpf,
        motherName: member.mother_name,
        fatherName: member.father_name,
        profession: member.profession,
        email: member.email,
        phone: member.phone,
        cellPhone: member.cell_phone,
        crNumber: member.cr_number,
        crValidity: member.cr_validity,
        healthIssues: member.health_issues,
        gender: member.gender,
        maritalStatus: member.marital_status,
        bloodTyping: member.blood_typing,
        disabled: member.disabled,
        disabledAt,
        createdAt,
        updatedAt,
        lastDisabledBy: member.last_disabled_by,
        lastUpdatedBy: member.last_updated_by,
        planId: member.plan_id,
        naturalityCityId: member.naturality_city_id,
        issuedAt: member.issued_at,
        birthDate: member.birth_date,
        createdBy: member.created_by,
        disabledByUser: member.disabled_by_user,
      }
    })

    return parsedMembersResult
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
        issuedAt: true,
        birthDate: true,
        memberAddresses: true,
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
    const { disabledAt, lastDisabledBy, lastUpdatedBy, logUserId } = getDisabledInfo(member.disabled, requestUserId)

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

    if (disabledAt) {
      await logsRepository.store("members", {
        action: "disable",
        description: "Registro desativado por usuário",
        referenceId: id,
        userId: logUserId,
      })
    } else {
      await logsRepository.store("members", {
        action: "update",
        description: "Registro atualizado por usuário",
        referenceId: id,
        userId: logUserId,
      })
    }

    return id
  }

  async findCount() {
    const count = await prisma.members.count()
    return count
  }
}

export default new MembersRepository()
