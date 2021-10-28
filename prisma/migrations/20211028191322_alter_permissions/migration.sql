/*
  Warnings:

  - Added the required column `table_id` to the `permissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "permissions" ADD COLUMN     "table_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "general_tables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
