/*
  Warnings:

  - You are about to drop the `members_documents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "members_documents" DROP CONSTRAINT "members_documents_created_by_fkey";

-- DropForeignKey
ALTER TABLE "members_documents" DROP CONSTRAINT "members_documents_last_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "members_documents" DROP CONSTRAINT "members_documents_member_id_fkey";

-- DropTable
DROP TABLE "members_documents";
