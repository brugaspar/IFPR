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
}
