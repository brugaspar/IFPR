import jwt from "jsonwebtoken"

const secretToken = process.env.JWT_SECRET_TOKEN || ""

export function generateToken(payload: {}) {
  return jwt.sign(payload, secretToken)
}

export function verifyToken(token: string) {
  return jwt.verify(token, secretToken)
}
