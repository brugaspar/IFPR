-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_created_by_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_last_updated_by_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "last_updated_by" DROP NOT NULL,
ALTER COLUMN "created_by" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_last_updated_by_fkey" FOREIGN KEY ("last_updated_by") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
