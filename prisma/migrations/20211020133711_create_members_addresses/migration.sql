-- CreateTable
CREATE TABLE "members_addresses" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "neighbourhood" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "city_id" INTEGER NOT NULL,
    "member_id" TEXT NOT NULL,

    CONSTRAINT "members_addresses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "members_addresses" ADD CONSTRAINT "members_addresses_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members_addresses" ADD CONSTRAINT "members_addresses_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
