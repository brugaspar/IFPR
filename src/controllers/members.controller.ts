import { Request, Response } from "express"
import * as yup from "yup"

import { checkBodySchema } from "../handlers/schema.handler"
import { checkRequestUser } from "../helpers/request.helper"

import { AppError } from "../handlers/errors.handler"

import membersRepository from "../repositories/members.repository"
import plansRepository from "../repositories/plans.repository"

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

type FilterMember = {
  onlyEnabled: boolean
}

class MemberController {
  async store(request: Request, response: Response) {
    const member: RequestMember = request.body

    const schema = {
      name: yup.string().required(),
      rg: yup.string().required(),
      issuingAuthority: yup.string().required(),
      cpf: yup.string().required(),
      naturalityCityId: yup.string().required(),
      motherName: yup.string(),
      fatherName: yup.string(),
      profession: yup.string().required(),
      email: yup.string(),
      phone: yup.string(),
      cellPhone: yup.string().required(),
      crNumber: yup.string().required(),
      issuedAt: yup.date().required(),
      birthDate: yup.date().required(),
      crValidity: yup.date().required(),
      healthIssues: yup.string(),
      gender: yup.mixed().oneOf(["male", "female", "other"]).required(),
      maritalStatus: yup
        .mixed()
        .oneOf(["single", "married", "widower", "legally_separated", "divorced"])
        .required(),
      bloodTyping: yup
        .mixed()
        .oneOf([
          "APositive",
          "ANegative",
          "BPositive",
          "BNegative",
          "ABPositive",
          "ABNegative",
          "OPositive",
          "ONegative",
        ])
        .required(),
      disabled: yup.string(),
      planId: yup.string().required(),
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

    const storedMember = await membersRepository.store(member, request.userId)

    return response.status(201).json({ id: storedMember })
  }

  async index(request: Request, response: Response) {
    const { onlyEnabled = true }: FilterMember = request.body

    const schema = {
      onlyEnabled: yup.boolean(),
    }

    await checkBodySchema(schema, request.body)

    await checkRequestUser(request.userId)

    const members = await membersRepository.findAll(onlyEnabled)

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
      issuedAt: yup.date(),
      birthDate: yup.date(),
      crValidity: yup.date(),
      healthIssues: yup.string(),
      gender: yup.mixed().oneOf(["male", "female", "other"]),
      maritalStatus: yup.mixed().oneOf(["single", "married", "widower", "legally_separated", "divorced"]),
      bloodTyping: yup
        .mixed()
        .oneOf([
          "APositive",
          "ANegative",
          "BPositive",
          "BNegative",
          "ABPositive",
          "ABNegative",
          "OPositive",
          "ONegative",
        ]),
      disabled: yup.string(),
      planId: yup.string(),
    }

    await checkBodySchema(schema, request.body)

    await checkRequestUser(request.userId)

    if (member.email) {
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

    const updatedMember = await membersRepository.update({
      member,
      requestUserId: request.userId,
      memberId: id,
    })

    return response.status(200).json({ id: updatedMember })
  }
}

export default new MemberController()
