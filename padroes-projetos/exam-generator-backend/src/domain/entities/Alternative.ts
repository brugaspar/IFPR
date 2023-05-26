import { Entity } from "../../core/domain/Entity";
import { AlternativeProps } from "../../application/repositories/AlternativeRepository";

export class Alternative extends Entity<AlternativeProps> {
  constructor(props: AlternativeProps) {
    super(props);
  }

  public static create(props: AlternativeProps): Alternative {
    return new Alternative(props);
  }
}
