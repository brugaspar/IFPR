import { Request, Response } from "express"
import * as yup from "yup"
import { checkBodySchema } from "../handlers/schema.handler"
import { checkRequestUser } from "../helpers/request.helper"
import membersRepository from "../repositories/members.repository"

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

    const storedMember = await membersRepository.store(member, request.userId)

    return response.status(201).json({ id: storedMember })
  }
}

export default new MemberController()
