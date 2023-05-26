-- DropForeignKey
ALTER TABLE "question" DROP CONSTRAINT "question_tag_id_fkey";

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
