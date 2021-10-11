/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `table` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "table_name_key" ON "table"("name");
