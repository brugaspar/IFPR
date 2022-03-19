import { Alternative, Question as PrismaQuestion, Tag } from "@prisma/client";
import { Question } from "../../application/controllers/ExamController";

export type StoredQuestion = PrismaQuestion & {
  alternatives: Alternative[];
  tag: Tag;
};

export interface CorrectQuestionStrategy {
  correct(storedQuestion: StoredQuestion, question: Question): boolean[];
}
