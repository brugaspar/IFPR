import { BaseQuestion } from "../../core/domain/BaseQuestion";
import { QuestionProps } from "../../application/repositories/QuestionRepository";

type SingleQuestionProps = Omit<QuestionProps, "type">;

export class SingleQuestion extends BaseQuestion {
  private constructor(props: SingleQuestionProps) {
    super({ ...props, type: "single" });
  }

  static create(props: SingleQuestionProps): SingleQuestion {
    return new SingleQuestion(props);
  }
}
