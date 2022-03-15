import { prisma } from "../../configuration/PrismaConfiguration";

type ExamStatus = "draft" | "published" | "finished";

export type ExamProps = {
  status: ExamStatus;
  title: string;
  description: string;
  grade: number;
  createdAt: string;
  finishedAt: string;
};

export class ExamRepository {}
