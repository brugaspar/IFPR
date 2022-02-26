import { Entity } from "../../core/domain/Entity";
import { TagProps } from "../../application/repositories/TagRepository";

export class Tag extends Entity<TagProps> {
  private constructor(props: TagProps) {
    super(props);
  }

  static create(props: TagProps): Tag {
    return new Tag(props);
  }
}
