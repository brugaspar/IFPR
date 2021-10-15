-- CreateTable
CREATE TABLE "members_plans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "value" DOUBLE PRECISION NOT NULL,
    "renew_value" DOUBLE PRECISION NOT NULL,
    "gun_target_discount" DOUBLE PRECISION NOT NULL,
    "course_discount" DOUBLE PRECISION NOT NULL,
    "shooting_drills_per_year" INTEGER NOT NULL,
    "gun_exemption" BOOLEAN NOT NULL,
    "target_exemption" BOOLEAN NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "disabled_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_disabled_by" TEXT,
    "last_updated_by" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,

    CONSTRAINT "members_plans_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "members_plans" ADD CONSTRAINT "members_plans_last_disabled_by_fkey" FOREIGN KEY ("last_disabled_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members_plans" ADD CONSTRAINT "members_plans_last_updated_by_fkey" FOREIGN KEY ("last_updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members_plans" ADD CONSTRAINT "members_plans_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
