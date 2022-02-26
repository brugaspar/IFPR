import { BaseQuestion } from "../../core/domain/BaseQuestion";
import { QuestionProps } from "../../application/repositories/QuestionRepository";

type MultipleQuestionProps = Omit<QuestionProps, "type">;

export class MultipleQuestion extends BaseQuestion {
  private constructor(props: MultipleQuestionProps) {
    super({ ...props, type: "multiple" });
  }

  static create(props: MultipleQuestionProps): MultipleQuestion {
    return new MultipleQuestion(props);
  }
}
