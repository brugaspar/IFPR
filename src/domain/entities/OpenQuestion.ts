import { BaseQuestion, BaseQuestionProps } from "../../core/domain/BaseQuestion";

type OpenQuestionProps = Omit<BaseQuestionProps, "type">;

export class OpenQuestion extends BaseQuestion {
  private constructor(props: OpenQuestionProps) {
    super({ ...props, type: "open" });
  }

  static create(props: OpenQuestionProps): OpenQuestion {
    return new OpenQuestion(props);
  }
}
