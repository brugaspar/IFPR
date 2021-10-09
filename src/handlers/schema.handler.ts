import * as yup from "yup"

import { AppError } from "./errors.handler"

export async function checkBodySchema(schema: {}, requestBody: any) {
  const yupSchema = yup.object().shape(schema)

  try {
    await yupSchema.validate(requestBody, { abortEarly: false })
  } catch (error: any) {
    if (error.errors) {
      throw new AppError(error.errors)
    }
  }
}
