import { Request, Response } from "express"
import * as yup from "yup"

import { checkBodySchema } from "../handlers/schema.handler"
import { checkRequestUser } from "../helpers/request.helper"

import { AppError } from "../handlers/errors.handler"

import membersRepository from "../repositories/members.repository"
import plansRepository from "../repositories/plans.repository"
import addressesRepository from "../repositories/addresses.repository"

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
  addresses: {
    street: string
    number: string
    neighbourhood: string
    complement: string
    zipcode: string
    cityId: number
  }[]
}

class MemberController {
  async store(request: Request, response: Response) {
    const member: RequestMember = request.body

    const schema = {
      name: yup.string().required("Nome é obrigatório"),
      rg: yup.string().required("RG é obrigatório"),
      issuingAuthority: yup.string().required("Órgão emissor do RG é obrigatório"),
      cpf: yup.string().required(),
      naturalityCityId: yup.string().required("Cidade de naturalidade é obrigatória"),
      motherName: yup.string(),
      fatherName: yup.string(),
      profession: yup.string().required("Profissão é obrigatória"),
      email: yup.string(),
      phone: yup.string(),
      cellPhone: yup.string().required("Celular é obrigatório"),
      crNumber: yup.string().required("Número do CR é obrigatório"),
      issuedAt: yup.string().required("Data de emissão do RG é obrigatória"),
      birthDate: yup.string().required("Data de nascimento é obrigatória"),
      crValidity: yup.string().required("Validade do CR é obrigatória"),
      healthIssues: yup.string(),
      gender: yup.mixed().oneOf(["male", "female", "other"]).required("Gênero é obrigatório"),
      maritalStatus: yup
        .mixed()
        .oneOf(["single", "married", "widower", "legally_separated", "divorced"])
        .required("Estado civil é obrigatório"),
      bloodTyping: yup
        .mixed()
        .oneOf(["APositive", "ANegative", "BPositive", "BNegative", "ABPositive", "ABNegative", "OPositive", "ONegative"])
        .required("Tipo sanguíneo é obrigatório"),
      disabled: yup.string(),
      planId: yup.string().required("Plano é obrigatório"),
      // address: yup.object().shape({
      //   street: yup.string().required("Endereço é obrigatório"),
      //   number: yup.string().required("Número é obrigatório"),
      //   neighbourhood: yup.string().required("Bairro é obrigatório"),
      //   complement: yup.string(),
      //   zipcode: yup.string().required("CEP é obrigatório"),
      //   cityId: yup.number().required("Cidade é obrigatória"),
      // }),
    }

    await checkBodySchema(schema, request.body)

    await checkRequestUser(request.userId)

    if (member.email) {
      const emailExists = await membersRepository.findByEmail(member.email)

      if (emailExists) {
        throw new AppError("E-mail já está em uso")
      }
    }

    const planExists = await plansRepository.findById(member.planId)

    if (!planExists) {
      throw new AppError("Plano não encontrado")
    }

    member.issuedAt = new Date(member.issuedAt).toISOString()
    member.crValidity = new Date(member.crValidity).toISOString()
    member.birthDate = new Date(member.birthDate).toISOString()

    const { addresses, ...memberData } = member

    const storedMember = await membersRepository.store(
      {
        ...memberData,
        naturalityCityId: Number(member.naturalityCityId),
      },
      request.userId
    )

    for (const address of addresses) {
      await addressesRepository.store(
        {
          ...address,
          memberId: storedMember,
        },
        request.userId
      )
    }

    return response.status(201).json({ id: storedMember })
  }

  async index(request: Request, response: Response) {
    const { onlyEnabled = true, search = "", sort = { name: "", sort: "asc" } } = request.query as any

    const parsedOnlyEnabled = onlyEnabled ? JSON.parse(onlyEnabled) : true

    let parsedSort = { name: "", sort: "asc" }

    try {
      parsedSort = JSON.parse(sort)
    } catch (error) {
      // ignore
    }

    await checkRequestUser(request.userId)

    const members = await membersRepository.findAll({
      onlyEnabled: parsedOnlyEnabled,
      search,
      sort: parsedSort,
    })

    return response.status(200).json(members)
  }

  async show(request: Request, response: Response) {
    const id = request.params.id

    await checkRequestUser(request.userId)

    const member = await membersRepository.findById(id)

    if (!member) {
      throw new AppError("Membro não encontrado")
    }

    return response.status(200).json(member)
  }

  async update(request: Request, response: Response) {
    const member: RequestMember = request.body

    const id = request.params.id

    const schema = {
      name: yup.string(),
      rg: yup.string(),
      issuingAuthority: yup.string(),
      cpf: yup.string(),
      naturalityCityId: yup.string(),
      motherName: yup.string(),
      fatherName: yup.string(),
      profession: yup.string(),
      email: yup.string(),
      phone: yup.string(),
      cellPhone: yup.string(),
      crNumber: yup.string(),
      issuedAt: yup.string(),
      birthDate: yup.string(),
      crValidity: yup.string(),
      healthIssues: yup.string(),
      gender: yup.mixed().oneOf(["male", "female", "other"]),
      maritalStatus: yup.mixed().oneOf(["single", "married", "widower", "legally_separated", "divorced"]),
      bloodTyping: yup
        .mixed()
        .oneOf(["APositive", "ANegative", "BPositive", "BNegative", "ABPositive", "ABNegative", "OPositive", "ONegative"]),
      disabled: yup.string(),
      planId: yup.string(),
      addresses: yup.array(
        yup.object().shape({
          street: yup.string(),
          number: yup.string(),
          neighbourhood: yup.string(),
          complement: yup.string(),
          zipcode: yup.string(),
          cityId: yup.number(),
        })
      ),
    }

    await checkBodySchema(schema, request.body)

    await checkRequestUser(request.userId)

    const memberExists = await membersRepository.findById(id)

    if (!memberExists) {
      throw new AppError("Membro não encontrado")
    }

    if (member.email && member.email !== memberExists.email) {
      const emailExists = await membersRepository.findByEmail(member.email)

      if (emailExists) {
        throw new AppError("E-mail já está em uso")
      }
    }

    if (member.planId) {
      const planExists = await plansRepository.findById(member.planId)

      if (!planExists) {
        throw new AppError("Plano não encontrado")
      }
    }

    const { addresses, ...memberData } = member

    const updatedMember = await membersRepository.update({
      member: memberData,
      requestUserId: request.userId,
      memberId: id,
    })

    if (addresses.length) {
      await addressesRepository.deleteByUser(updatedMember)

      for (const address of addresses) {
        await addressesRepository.store(
          {
            ...address,
            memberId: updatedMember,
          },
          request.userId
        )
      }
    }

    return response.status(200).json({ id: updatedMember })
  }
}

export default new MemberController()
