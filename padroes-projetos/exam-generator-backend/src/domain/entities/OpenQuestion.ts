import { BaseQuestion } from "../../core/domain/BaseQuestion";
import { QuestionProps } from "../../application/repositories/QuestionRepository";

type OpenQuestionProps = Omit<QuestionProps, "type">;

export class OpenQuestion extends BaseQuestion {
  private constructor(props: OpenQuestionProps) {
    super({ ...props, type: "open" });
  }

  static create(props: OpenQuestionProps): OpenQuestion {
    return new OpenQuestion(props);
  }
}
