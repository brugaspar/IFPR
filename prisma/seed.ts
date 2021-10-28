import "dotenv/config"
import { PrismaClient } from ".prisma/client"

import tables from "./data/tables.json"
import permissions from "./data/permissions.json"
import cities from "./data/cities.json"
import states from "./data/states.json"

const prisma = new PrismaClient()

async function deleteFromAllTables() {
  await prisma.users.deleteMany()
  await prisma.membersAddresses.deleteMany()
  await prisma.membersDocuments.deleteMany()
  await prisma.members.deleteMany()
  await prisma.cities.deleteMany()
  await prisma.states.deleteMany()
  await prisma.permissions.deleteMany()
  await prisma.logs.deleteMany()
  await prisma.tables.deleteMany()
}

async function insertTables() {
  await prisma.tables.createMany({
    data: tables,
  })
}

async function insertPermissions() {
  const parsedPermissions = []

  for (const permission of permissions) {
    const table = await prisma.tables.findUnique({
      where: {
        name: permission.table,
      },
      select: {
        id: true,
      },
    })

    parsedPermissions.push({
      name: permission.name,
      slug: permission.slug,
      description: permission.description,
      tableId: table?.id || "",
    })
  }

  await prisma.permissions.createMany({
    data: parsedPermissions,
  })
}

async function insertStates() {
  await prisma.states.createMany({
    data: states,
  })
}

async function insertCities() {
  await prisma.cities.createMany({
    data: cities,
  })
}

async function insertAdminUser() {
  const adminId = process.env.ADMIN_ID || "ADMIN-ID"

  await prisma.users.create({
    data: {
      id: adminId,
      name: "Administrador",
      email: "admin@admin.com",
      password: "$2a$10$7HEUt9Y6r6.xqqsOdqbFl.TEf9i7xtHdlgmA2EcmlgzY5XD9EWg2K", // admin@23646
      permissions: ["list_users", "create_users", "edit_users", "disable_users"],
      username: "administrador",
      createdBy: adminId,
      lastUpdatedBy: adminId,
    },
  })
}

async function insertSeedData() {
  await deleteFromAllTables()

  await insertTables()
  await insertPermissions()
  await insertStates()
  await insertCities()
  await insertAdminUser()
}

insertSeedData()
