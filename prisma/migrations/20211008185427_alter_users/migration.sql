/*
  Warnings:

  - Made the column `last_updated_by` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_by` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_created_by_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_last_updated_by_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "last_updated_by" SET NOT NULL,
ALTER COLUMN "created_by" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_last_updated_by_fkey" FOREIGN KEY ("last_updated_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
