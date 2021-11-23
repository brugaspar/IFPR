import axios from "axios"

const FIVE_SECONDS = 5000

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: FIVE_SECONDS,
  timeoutErrorMessage: "Tempo da requisição esgotou",
})
