-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('single', 'married', 'widower', 'legally_separated', 'divorced');

-- CreateEnum
CREATE TYPE "BloodTyping" AS ENUM ('APositive', 'ANegative', 'BPositive', 'BNegative', 'ABPositive', 'ABNegative', 'OPositive', 'ONegative');

-- CreateTable
CREATE TABLE "members" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "issuing_authority" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "naturality_city_id" INTEGER NOT NULL,
    "mother_name" TEXT,
    "father_name" TEXT,
    "profession" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "cell_phone" TEXT NOT NULL,
    "cr_number" TEXT NOT NULL,
    "issued_at" TIMESTAMP(3) NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "cr_validity" TIMESTAMP(3) NOT NULL,
    "health_issues" TEXT,
    "gender" "Gender" NOT NULL,
    "marital_status" "MaritalStatus" NOT NULL,
    "blood_typing" "BloodTyping" NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "disabled_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "last_disabled_by" TEXT,
    "last_updated_by" TEXT,
    "created_by" TEXT,
    "plan_id" TEXT NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "members_cpf_key" ON "members"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "members_email_key" ON "members"("email");

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_naturality_city_id_fkey" FOREIGN KEY ("naturality_city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_last_disabled_by_fkey" FOREIGN KEY ("last_disabled_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_last_updated_by_fkey" FOREIGN KEY ("last_updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "members_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
