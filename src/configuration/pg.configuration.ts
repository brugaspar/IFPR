import { Pool } from "pg"

const pgPool = new Pool({
  ssl: false,
})

export { pgPool }
