import "dotenv/config"
import { PrismaClient } from ".prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.permission.createMany({
    data: [
      {
        name: "Permite alterar permissões",
        slug: "PER_001",
        description: "Permite a alteração das permissões dos usuários cadastrados",
      },
      {
        name: "Permite visualizar usuários",
        slug: "USU_001",
        description: "Permite a visualização da lista de usuários cadastrados",
      },
      {
        name: "Permite incluir usuários",
        slug: "USU_002",
        description: "Permite a inclusão de um novo usuário no sistema",
      },
      {
        name: "Permite editar usuários",
        slug: "USU_003",
        description: "Permite a edição dos dados cadastrais dos usuários",
      },
      {
        name: "Permite excluir usuários",
        slug: "USU_004",
        description: "Permite a exclusão de um usuário do sistema",
      },
    ],
  })

  const adminId = process.env.ADMIN_ID || "ADMIN-ID"

  await prisma.user.create({
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

main()
