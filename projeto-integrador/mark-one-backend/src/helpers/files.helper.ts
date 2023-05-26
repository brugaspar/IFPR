import { DateTime } from "luxon"
import path from "path"
import fs from "fs"

export function saveError(error: Error) {
  const formattedDateTime = DateTime.now().toFormat("dd/MM/yyyy - HH:mm:ss")
  const formattedDate = DateTime.now().toFormat("yyMMdd")
  const time = new Date().getTime()

  const resolvedPath = path.resolve(__dirname, "..", "..", "errors")

  if (!fs.existsSync(resolvedPath)) {
    fs.mkdirSync(resolvedPath)
  }

  const errorFile = `${resolvedPath}/${formattedDate}-app-error-${time}.txt`

  const data = `Erro na aplicação | ${formattedDateTime}\nError: ${error.message}`

  fs.writeFile(errorFile, data, (error) => {
    if (error) console.log(error)
  })
}
