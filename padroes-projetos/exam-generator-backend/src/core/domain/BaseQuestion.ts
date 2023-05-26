import { Entity } from "./Entity";
import { QuestionProps } from "../../application/repositories/QuestionRepository";

export abstract class BaseQuestion extends Entity<QuestionProps> {
  public props: QuestionProps;

  constructor(props: QuestionProps) {
    super(props);
  }
}
