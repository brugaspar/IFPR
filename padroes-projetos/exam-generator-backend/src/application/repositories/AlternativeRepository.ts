import { prisma } from "../../configuration/PrismaConfiguration";

export type AlternativeProps = {
  title: string;
  isCorrect: boolean;
  questionId: string;
};

export class AlternativeRepository {
  async save(alternative: AlternativeProps) {
    const newAlternative = await prisma.alternative.create({
      data: alternative,
    });

    return newAlternative;
  }

  async update(alternative: AlternativeProps & { id: string }) {
    const updatedAlternative = await prisma.alternative.update({
      where: {
        id: alternative.id,
      },
      data: alternative,
    });

    return updatedAlternative;
  }

  async delete(id: string) {
    await prisma.alternative.delete({
      where: {
        id,
      },
    });
  }

  async findById(id: string) {
    const alternative = await prisma.alternative.findUnique({
      where: {
        id,
      },
    });

    return alternative;
  }
}
