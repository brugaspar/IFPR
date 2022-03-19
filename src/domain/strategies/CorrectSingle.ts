import { Question } from "../../application/controllers/ExamController";
import { CorrectQuestionStrategy, StoredQuestion } from "./CorrectQuestionStrategy";

export class CorrectSingle implements CorrectQuestionStrategy {
  correct(storedQuestion: StoredQuestion, question: Question) {
    if (!question.alternatives) {
      question.alternatives = [];
    }
    const alternative = storedQuestion.alternatives.find((alternative) => alternative.id === question.alternatives[0]);

    return [alternative?.isCorrect || false];
  }
}
