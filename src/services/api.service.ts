import axios from "axios";

// const baseURL = "http://192.168.1.250:51001/api/v1";
const baseURL = "http://senha.zapto.org:51001/api/v1";

export const api = axios.create({
  baseURL,
  timeout: 5000, // 5 segundos
  timeoutErrorMessage: "Request Timeout",
});
