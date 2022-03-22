import { Question } from "../../application/controllers/ExamController";
import { CorrectQuestionStrategy, StoredQuestion } from "./CorrectQuestionStrategy";

export class CorrectMultiple implements CorrectQuestionStrategy {
  correct(storedQuestion: StoredQuestion, question: Question) {
    const alternatives = storedQuestion.alternatives.map((alternative) => {
      return { id: alternative.id, isCorrect: alternative.isCorrect };
    });

    if (!question.alternatives) {
      question.alternatives = [];
    }
    const isCorrect = alternatives.map((a) => {
      return (question.alternatives.includes(a.id) && a.isCorrect) || (!question.alternatives.includes(a.id) && !a.isCorrect);
      // return {
      //   isMarked: question.alternatives.includes(a.id),
      //   isCorrect: a.isCorrect,
      // }; // && a.isCorrect;
      //|| (!question.alternatives.includes(a.id) && !a.isCorrect)
    });

    // const isCorrect = mapAlternatives.map((a) => {
    //   return a.isMarked && a.isCorrect;
    // });

    return isCorrect;
  }
}
