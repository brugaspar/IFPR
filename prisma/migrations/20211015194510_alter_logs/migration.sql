-- DropForeignKey
ALTER TABLE "general_logs" DROP CONSTRAINT "general_logs_user_id_fkey";

-- AlterTable
ALTER TABLE "general_logs" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "general_logs" ADD CONSTRAINT "general_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
