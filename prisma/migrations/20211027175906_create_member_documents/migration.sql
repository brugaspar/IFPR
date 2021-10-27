-- CreateTable
CREATE TABLE "members_documents" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "validity" TIMESTAMP(3),
    "member_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated_by" TEXT,
    "created_by" TEXT,

    CONSTRAINT "members_documents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "members_documents" ADD CONSTRAINT "members_documents_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members_documents" ADD CONSTRAINT "members_documents_last_updated_by_fkey" FOREIGN KEY ("last_updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members_documents" ADD CONSTRAINT "members_documents_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
