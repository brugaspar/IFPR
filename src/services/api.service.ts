import axios from "axios";

export const api = axios.create({
  baseURL: "http://senha.zapto.org:51001/api/v1",
  timeout: 5000, // 5 segundos
  timeoutErrorMessage: "Request Timeout",
});
