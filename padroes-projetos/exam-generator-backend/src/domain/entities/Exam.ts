import { Entity } from "../../core/domain/Entity";
import { ExamProps } from "../../application/repositories/ExamRepository";

export class Exam extends Entity<ExamProps> {
  private constructor(props: ExamProps) {
    super(props);
  }

  static create(props: ExamProps): Exam {
    return new Exam(props);
  }
}
