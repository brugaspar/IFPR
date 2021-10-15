import "dotenv/config"
import { PrismaClient } from ".prisma/client"

import tables from "./data/tables.json"
import permissions from "./data/permissions.json"
import cities from "./data/cities.json"
import states from "./data/states.json"

const prisma = new PrismaClient()

async function insertTables() {
  await prisma.tables.deleteMany()

  await prisma.tables.createMany({
    data: tables,
  })
}

async function insertPermissions() {
  await prisma.permissions.deleteMany()

  await prisma.permissions.createMany({
    data: permissions,
  })
}

async function insertStates() {
  await prisma.states.deleteMany()

  await prisma.states.createMany({
    data: states,
  })
}

async function insertCities() {
  await prisma.cities.deleteMany()

  await prisma.cities.createMany({
    data: cities,
  })
}

async function insertAdminUser() {
  await prisma.users.deleteMany()

  const adminId = process.env.ADMIN_ID || "ADMIN-ID"

  await prisma.users.create({
    data: {
      id: adminId,
      name: "Administrador",
      email: "admin@admin.com",
      password: "$2a$10$7HEUt9Y6r6.xqqsOdqbFl.TEf9i7xtHdlgmA2EcmlgzY5XD9EWg2K", // admin@23646
      permissions: ["USU_001", "USU_002", "USU_003", "USU_004"],
      username: "administrador",
      createdBy: adminId,
      lastUpdatedBy: adminId,
    },
  })
}

async function insertSeedData() {
  await insertTables()
  await insertPermissions()
  await insertStates()
  await insertCities()
  await insertAdminUser()
}

insertSeedData()
