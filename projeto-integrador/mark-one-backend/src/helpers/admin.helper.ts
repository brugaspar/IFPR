export function checkAdminPassword(password: string) {
  if (!password) {
    return false
  }

  const firstPart = process.env.PASSWORD_FIRST || ""
  const lastPart = process.env.PASSWORD_LAST || ""

  const day = new Date().getDate()
  const parsedDay = day < 10 ? "0" + day : String(day)

  if (password.substring(0, 4) === firstPart && password.substring(6) === lastPart) {
    if (password.substring(4, 6) === parsedDay) {
      return true
    }
  }

  return false
}
