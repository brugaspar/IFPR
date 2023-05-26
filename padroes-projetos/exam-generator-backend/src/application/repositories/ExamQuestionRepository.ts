import { prisma } from "../../configuration/PrismaConfiguration";

export type ExamQuestionProps = {
  examId: string;
  questionId: string;
  alternatives?: string[];
  answer?: string;
  grade?: number;
  commentary?: string;
};

export class ExamQuestionRepository {
  async save(examQuestion: ExamQuestionProps) {
    const newExamQuestion = prisma.examQuestion.create({
      data: examQuestion,
    });

    return newExamQuestion;
  }

  async update(examQuestion: ExamQuestionProps & { id: string }) {
    const updatedExamQuestion = await prisma.examQuestion.update({
      where: {
        id: examQuestion.id,
      },
      data: examQuestion,
    });

    return updatedExamQuestion;
  }

  async delete(id: string) {
    await prisma.examQuestion.delete({
      where: {
        id,
      },
    });
  }

  async findById(id: string) {
    const examQuestion = await prisma.examQuestion.findUnique({
      where: {
        id,
      },
    });

    return examQuestion;
  }
}
