-- AlterTable
ALTER TABLE "activities" ADD COLUMN     "finished_at" TIMESTAMP(3),
ADD COLUMN     "finished_by" TEXT,
ADD COLUMN     "last_cancelled_by" TEXT;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_last_cancelled_by_fkey" FOREIGN KEY ("last_cancelled_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_finished_by_fkey" FOREIGN KEY ("finished_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
