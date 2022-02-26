import { BaseQuestion, BaseQuestionProps } from "../../core/domain/BaseQuestion";

type SingleQuestionProps = Omit<BaseQuestionProps, "type">;

export class SingleQuestion extends BaseQuestion {
  private constructor(props: SingleQuestionProps) {
    super({ ...props, type: "single" });
  }

  static create(props: SingleQuestionProps): SingleQuestion {
    return new SingleQuestion(props);
  }
}
