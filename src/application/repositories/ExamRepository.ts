import { prisma } from "../../configuration/PrismaConfiguration";

export type ExamProps = {
  title: string;
  description: string;
  status: "draft" | "published" | "waiting_for_review" | "finished";
};

export class ExamRepository {
  async save(exam: ExamProps) {
    const newExam = await prisma.exam.create({
      data: exam,
    });

    return newExam;
  }

  async update(exam: ExamProps & { id: string }) {
    const updatedExam = await prisma.exam.update({
      where: {
        id: exam.id,
      },
      data: exam,
    });

    return updatedExam;
  }

  async findAll() {
    const exams = await prisma.exam.findMany({
      include: {
        questions: {
          include: {
            question: {
              include: {
                alternatives: true,
                tag: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return exams;
  }

  async findById(id: string) {
    const exam = await prisma.exam.findUnique({
      where: {
        id,
      },
      include: {
        questions: {
          include: {
            question: {
              include: {
                alternatives: true,
              },
            },
          },
        },
      },
    });

    return exam;
  }

  async delete(id: string) {
    await prisma.exam.delete({
      where: {
        id,
      },
    });
  }
}
