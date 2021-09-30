import axios from "axios"

const FIVE_SECONDS = 5000

export const api = axios.create({
  baseURL: "http://localhost:3030/api/v1",
  timeout: FIVE_SECONDS,
  timeoutErrorMessage: "Tempo da requisição esgotou"
})