-- CreateEnum
CREATE TYPE "ExamStatus" AS ENUM ('draft', 'published', 'finished');

-- CreateTable
CREATE TABLE "exam" (
    "id" TEXT NOT NULL,
    "status" "ExamStatus" NOT NULL DEFAULT E'draft',
    "title" TEXT NOT NULL,
    "description" TEXT,
    "grade" DECIMAL(65,30),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished_at" TIMESTAMPTZ,

    CONSTRAINT "exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exam_question" (
    "id" TEXT NOT NULL,
    "grade" DECIMAL(65,30),
    "answer" TEXT,
    "alternatives" JSONB,
    "commentary" TEXT,
    "examId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "exam_question_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exam_question" ADD CONSTRAINT "exam_question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_question" ADD CONSTRAINT "exam_question_examId_fkey" FOREIGN KEY ("examId") REFERENCES "exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;
