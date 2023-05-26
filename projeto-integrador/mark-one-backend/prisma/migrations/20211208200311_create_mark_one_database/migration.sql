-- CreateEnum
CREATE TYPE "LogAction" AS ENUM ('insert', 'update', 'disable', 'delete', 'sign_in_error');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('single', 'married', 'widower', 'legally_separated', 'divorced');

-- CreateEnum
CREATE TYPE "BloodTyping" AS ENUM ('APositive', 'ANegative', 'BPositive', 'BNegative', 'ABPositive', 'ABNegative', 'OPositive', 'ONegative');

-- CreateEnum
CREATE TYPE "ActivitiesStatus" AS ENUM ('open', 'closed', 'cancelled');

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "slug" VARCHAR(60) NOT NULL,
    "table_id" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "username" VARCHAR(60) NOT NULL,
    "permissions" JSONB NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "disabled_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_disabled_by" TEXT,
    "last_updated_by" TEXT,
    "created_by" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "general_tables" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,

    CONSTRAINT "general_tables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "general_logs" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "action" "LogAction" NOT NULL,
    "table_id" TEXT NOT NULL,
    "reference_id" TEXT NOT NULL,
    "user_id" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "general_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "states" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "initials" VARCHAR(10) NOT NULL,

    CONSTRAINT "states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "state_id" INTEGER NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "members_plans" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "description" TEXT,
    "value" DOUBLE PRECISION NOT NULL,
    "renew_value" DOUBLE PRECISION NOT NULL,
    "gun_target_discount" DOUBLE PRECISION NOT NULL,
    "course_discount" DOUBLE PRECISION NOT NULL,
    "shooting_drills_per_year" INTEGER NOT NULL,
    "gun_exemption" BOOLEAN NOT NULL,
    "target_exemption" BOOLEAN NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "disabled_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_disabled_by" TEXT,
    "last_updated_by" TEXT,
    "created_by" TEXT,

    CONSTRAINT "members_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "members" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "rg" VARCHAR(60) NOT NULL,
    "issuing_authority" VARCHAR(60) NOT NULL,
    "cpf" VARCHAR(60) NOT NULL,
    "naturality_city_id" INTEGER NOT NULL,
    "mother_name" VARCHAR(60),
    "father_name" VARCHAR(60),
    "profession" VARCHAR(60) NOT NULL,
    "email" VARCHAR(60),
    "phone" VARCHAR(60),
    "cell_phone" VARCHAR(60) NOT NULL,
    "cr_number" VARCHAR(60) NOT NULL,
    "issued_at" TIMESTAMPTZ NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "cr_validity" TIMESTAMP(3) NOT NULL,
    "health_issues" TEXT,
    "gender" "Gender" NOT NULL,
    "marital_status" "MaritalStatus" NOT NULL,
    "blood_typing" "BloodTyping" NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "disabled_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_disabled_by" TEXT,
    "last_updated_by" TEXT,
    "created_by" TEXT,
    "plan_id" TEXT NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "members_addresses" (
    "id" TEXT NOT NULL,
    "street" VARCHAR(60) NOT NULL,
    "neighbourhood" VARCHAR(60) NOT NULL,
    "number" VARCHAR(60) NOT NULL,
    "complement" VARCHAR(60),
    "zipcode" VARCHAR(60) NOT NULL,
    "city_id" INTEGER NOT NULL,
    "member_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated_by" TEXT,
    "created_by" TEXT,

    CONSTRAINT "members_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_brands" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "disabled_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_disabled_by" TEXT,
    "last_updated_by" TEXT,
    "created_by" TEXT,

    CONSTRAINT "products_brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_groups" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "disabled_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_disabled_by" TEXT,
    "last_updated_by" TEXT,
    "created_by" TEXT,

    CONSTRAINT "products_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "is_service" BOOLEAN NOT NULL DEFAULT false,
    "name" VARCHAR(120) NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "minimum_quantity" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "brand_id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "disabled_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_disabled_by" TEXT,
    "last_updated_by" TEXT,
    "created_by" TEXT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" TEXT NOT NULL,
    "status" "ActivitiesStatus" NOT NULL DEFAULT E'open',
    "total" DOUBLE PRECISION NOT NULL,
    "total_quantity" DOUBLE PRECISION NOT NULL,
    "total_items" DOUBLE PRECISION NOT NULL,
    "observation" TEXT,
    "cancelled_reason" TEXT,
    "seller_id" TEXT NOT NULL,
    "member_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated_by" TEXT,
    "created_by" TEXT,
    "last_cancelled_by" TEXT,
    "cancelled_at" TIMESTAMPTZ,
    "finished_at" TIMESTAMPTZ,
    "finished_by" TEXT,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities_items" (
    "id" TEXT NOT NULL,
    "activity_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "activities_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "general_tables_name_key" ON "general_tables"("name");

-- CreateIndex
CREATE UNIQUE INDEX "members_cpf_key" ON "members"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "members_email_key" ON "members"("email");

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "general_tables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_last_disabled_by_fkey" FOREIGN KEY ("last_disabled_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_last_updated_by_fkey" FOREIGN KEY ("last_updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general_logs" ADD CONSTRAINT "general_logs_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "general_tables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general_logs" ADD CONSTRAINT "general_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members_plans" ADD CONSTRAINT "members_plans_last_disabled_by_fkey" FOREIGN KEY ("last_disabled_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members_plans" ADD CONSTRAINT "members_plans_last_updated_by_fkey" FOREIGN KEY ("last_updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members_plans" ADD CONSTRAINT "members_plans_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "members_addresses" ADD CONSTRAINT "members_addresses_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members_addresses" ADD CONSTRAINT "members_addresses_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members_addresses" ADD CONSTRAINT "members_addresses_last_updated_by_fkey" FOREIGN KEY ("last_updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members_addresses" ADD CONSTRAINT "members_addresses_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_brands" ADD CONSTRAINT "products_brands_last_disabled_by_fkey" FOREIGN KEY ("last_disabled_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_brands" ADD CONSTRAINT "products_brands_last_updated_by_fkey" FOREIGN KEY ("last_updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_brands" ADD CONSTRAINT "products_brands_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_groups" ADD CONSTRAINT "products_groups_last_disabled_by_fkey" FOREIGN KEY ("last_disabled_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_groups" ADD CONSTRAINT "products_groups_last_updated_by_fkey" FOREIGN KEY ("last_updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_groups" ADD CONSTRAINT "products_groups_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "products_brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "products_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_last_disabled_by_fkey" FOREIGN KEY ("last_disabled_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_last_updated_by_fkey" FOREIGN KEY ("last_updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_last_updated_by_fkey" FOREIGN KEY ("last_updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_last_cancelled_by_fkey" FOREIGN KEY ("last_cancelled_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_finished_by_fkey" FOREIGN KEY ("finished_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities_items" ADD CONSTRAINT "activities_items_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities_items" ADD CONSTRAINT "activities_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
