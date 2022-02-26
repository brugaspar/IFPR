import { BaseQuestion, BaseQuestionProps } from "../../core/domain/BaseQuestion";

type MultipleQuestionProps = Omit<BaseQuestionProps, "type">;

export class MultipleQuestion extends BaseQuestion {
  private constructor(props: MultipleQuestionProps) {
    super({ ...props, type: "multiple" });
  }

  static create(props: MultipleQuestionProps): MultipleQuestion {
    return new MultipleQuestion(props);
  }
}
