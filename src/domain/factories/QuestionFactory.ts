import { AppError } from "../../application/handlers/AppError";
import { QuestionDifficulty, QuestionType } from "../../application/repositories/QuestionRepository";
import { MultipleQuestion } from "../entities/MultipleQuestion";
import { OpenQuestion } from "../entities/OpenQuestion";
import { SingleQuestion } from "../entities/SingleQuestion";

type QuestionFactoryProps = {
  title: string;
  description: string;
  difficulty: QuestionDifficulty;
  tagId: string;
};

export class QuestionFactory {
  static create(type: QuestionType, props: QuestionFactoryProps) {
    switch (type) {
      case "open":
        return OpenQuestion.create(props);
      case "single":
        return SingleQuestion.create(props);
      case "multiple":
        return MultipleQuestion.create(props);
      default:
        throw new AppError("Tipo de questão inválido");
    }
  }
}
