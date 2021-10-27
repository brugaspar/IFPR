import multer from "multer"
import path from "path"
import crypto from "crypto"
import fs from "fs"

const destinationPath = path.resolve(__dirname, "..", "..", "uploads")

const local = multer.diskStorage({
  destination: (request, file, callback) => {
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath)
    }

    callback(null, destinationPath)
  },
  filename: (request, file, callback) => {
    crypto.randomBytes(16, (error, hash) => {
      if (error) {
        callback(error, "")
      }

      file.key = `${hash.toString("hex")}-${file.originalname}`

      callback(null, file.key)
    })
  },
})

const THREE_MB = 1024 * 1024 * 3

const multerConfiguration: multer.Options = {
  dest: destinationPath,
  storage: local,
  limits: {
    fileSize: THREE_MB,
  },
  fileFilter: (request, file, callback) => {
    const allowedMimes = ["image/jpeg", "image/pjpeg", "image/png", "application/pdf"]

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true)
    } else {
      callback(new Error("Formato de arquivo inválido"))
    }
  },
}

export default multerConfiguration
