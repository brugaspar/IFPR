import { Entity } from "./Entity";

type QuestionDifficulty = "easy" | "medium" | "hard";
type QuestionType = "multiple" | "single" | "open";

export type BaseQuestionProps = {
  title: string;
  description: string;
  difficulty: QuestionDifficulty;
  type: QuestionType;
  tagId: string;
};

export abstract class BaseQuestion extends Entity<BaseQuestionProps> {
  public props: BaseQuestionProps;

  constructor(props: BaseQuestionProps) {
    super(props);
  }
}
