-- CreateEnum
CREATE TYPE "LogAction" AS ENUM ('insert', 'update', 'disable', 'sign_in_error');

-- CreateTable
CREATE TABLE "general_tables" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "general_tables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "general_logs" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "action" "LogAction" NOT NULL,
    "table_id" TEXT NOT NULL,
    "reference_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "general_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "general_tables_name_key" ON "general_tables"("name");

-- AddForeignKey
ALTER TABLE "general_logs" ADD CONSTRAINT "general_logs_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "general_tables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general_logs" ADD CONSTRAINT "general_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
