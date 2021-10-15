-- DropForeignKey
ALTER TABLE "members_plans" DROP CONSTRAINT "members_plans_created_by_fkey";

-- DropForeignKey
ALTER TABLE "members_plans" DROP CONSTRAINT "members_plans_last_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_created_by_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_last_updated_by_fkey";

-- AlterTable
ALTER TABLE "members_plans" ALTER COLUMN "last_updated_by" DROP NOT NULL,
ALTER COLUMN "created_by" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "last_updated_by" DROP NOT NULL,
ALTER COLUMN "created_by" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_last_updated_by_fkey" FOREIGN KEY ("last_updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members_plans" ADD CONSTRAINT "members_plans_last_updated_by_fkey" FOREIGN KEY ("last_updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members_plans" ADD CONSTRAINT "members_plans_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
