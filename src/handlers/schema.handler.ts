import * as yup from "yup"

import { AppError } from "./errors.handler"

export async function checkBodySchema(body: {}, requestBody: any) {
  const schema = yup.object().shape(body)

  try {
    await schema.validate(requestBody, { abortEarly: false })
  } catch (error: any) {
    if (error.errors) {
      throw new AppError(error.errors)
    }
  }
}
