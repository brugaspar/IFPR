/*
  Warnings:

  - Added the required column `subtotal` to the `activities_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "activities_items" ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL;
