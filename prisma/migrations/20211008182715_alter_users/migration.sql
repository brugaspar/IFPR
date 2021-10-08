-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_last_disabled_by_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "last_disabled_by" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_last_disabled_by_fkey" FOREIGN KEY ("last_disabled_by") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
