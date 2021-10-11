/*
  Warnings:

  - You are about to drop the column `referenceId` on the `Log` table. All the data in the column will be lost.
  - Added the required column `reference_id` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Log" DROP COLUMN "referenceId",
ADD COLUMN     "reference_id" TEXT NOT NULL;
