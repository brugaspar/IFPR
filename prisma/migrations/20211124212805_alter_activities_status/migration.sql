/*
  Warnings:

  - The values [in_progress] on the enum `ActivitiesStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ActivitiesStatus_new" AS ENUM ('open', 'closed', 'cancelled');
ALTER TABLE "activities" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "activities" ALTER COLUMN "status" TYPE "ActivitiesStatus_new" USING ("status"::text::"ActivitiesStatus_new");
ALTER TYPE "ActivitiesStatus" RENAME TO "ActivitiesStatus_old";
ALTER TYPE "ActivitiesStatus_new" RENAME TO "ActivitiesStatus";
DROP TYPE "ActivitiesStatus_old";
ALTER TABLE "activities" ALTER COLUMN "status" SET DEFAULT 'open';
COMMIT;
