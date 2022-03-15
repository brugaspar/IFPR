import { Entity } from "../../core/domain/Entity";
import { ExamQuestionProps } from "../../application/repositories/ExamQuestionRepository";

export class ExamQuestion extends Entity<ExamQuestionProps> {
  private constructor(props: ExamQuestionProps) {
    super(props);
  }

  static create(props: ExamQuestionProps): ExamQuestion {
    return new ExamQuestion(props);
  }
}
