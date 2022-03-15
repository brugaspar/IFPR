import { prisma } from "../../configuration/PrismaConfiguration";

export type QuestionDifficulty = "easy" | "medium" | "hard";
export type QuestionType = "multiple" | "single" | "open";

export type QuestionProps = {
  title: string;
  description: string;
  difficulty: QuestionDifficulty;
  type: QuestionType;
  tagId: string;
};

export type QuestionFilters = {
  types?: QuestionType[];
  difficulties?: QuestionDifficulty[];
  tags?: string[];
  records?: number;
};

export class QuestionRepository {
  async save(question: QuestionProps) {
    const newQuestion = await prisma.question.create({
      data: question,
    });

    return newQuestion;
  }

  async update(question: QuestionProps & { id: string }) {
    const updatedQuestion = await prisma.question.update({
      where: {
        id: question.id,
      },
      data: question,
    });

    return updatedQuestion;
  }

  async findAll({ difficulties, types, tags, records }: QuestionFilters) {
    const where = {
      tagId: {
        in: tags,
      },
      difficulty: {
        in: difficulties,
      },
      type: {
        in: types,
      },
    };

    const counter = await prisma.question.count({ where });

    const skip = records && Math.floor(Math.random() * (counter - 1));

    const questions = await prisma.question.findMany({
      include: {
        alternatives: true,
        tag: true,
      },
      where,
      take: records,
      skip,
    });

    return questions;
  }

  async findById(id: string) {
    const question = await prisma.question.findUnique({
      where: {
        id,
      },
      include: {
        alternatives: true,
        tag: true,
      },
    });

    return question;
  }

  async delete(id: string) {
    await prisma.question.delete({
      where: {
        id,
      },
    });
  }
}
