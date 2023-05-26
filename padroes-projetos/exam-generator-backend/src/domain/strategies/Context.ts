import { Question } from "../../application/controllers/ExamController";
import { CorrectQuestionStrategy, StoredQuestion } from "./CorrectQuestionStrategy";

export class Context {
  private correctQuestionStrategy: CorrectQuestionStrategy;

  setStrategy(strategy: CorrectQuestionStrategy) {
    this.correctQuestionStrategy = strategy;
  }

  correct(storedQuestion: StoredQuestion, question: Question): boolean[] {
    return this.correctQuestionStrategy.correct(storedQuestion, question);
  }
}
