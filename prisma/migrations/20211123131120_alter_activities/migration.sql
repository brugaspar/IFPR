/*
  Warnings:

  - You are about to drop the column `cancelledReason` on the `activities` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "activities" DROP COLUMN "cancelledReason",
ADD COLUMN     "cancelled_reason" TEXT;
