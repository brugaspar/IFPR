/*
  Warnings:

  - You are about to drop the `Log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Table` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_table_id_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_user_id_fkey";

-- DropTable
DROP TABLE "Log";

-- DropTable
DROP TABLE "Table";

-- CreateTable
CREATE TABLE "table" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "action" "LogAction" NOT NULL,
    "table_id" TEXT NOT NULL,
    "reference_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "log" ADD CONSTRAINT "log_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log" ADD CONSTRAINT "log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
