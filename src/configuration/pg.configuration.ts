import { Pool } from "pg"

const pgPool = new Pool({
  ssl: {
    rejectUnauthorized: false,
  },
})

export { pgPool }
