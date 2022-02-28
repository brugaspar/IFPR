import { prisma } from "../../configuration/PrismaConfiguration";

export type TagProps = {
  name: string;
  description: string;
};

export class TagRepository {
  async save(tag: TagProps) {
    const newTag = await prisma.tag.create({
      data: tag,
    });

    return newTag;
  }

  async findAll() {
    const tags = await prisma.tag.findMany();
    return tags;
  }

  async findByName(name: string) {
    const tag = await prisma.tag.findUnique({
      where: {
        name,
      },
    });

    return tag;
  }

  async findById(id: string) {
    const tag = await prisma.tag.findUnique({
      where: {
        id,
      },
    });

    return tag;
  }

  async update(tag: TagProps & { id: string }) {
    const updatedTag = await prisma.tag.update({
      where: {
        id: tag.id,
      },
      data: tag,
    });

    return updatedTag;
  }

  async delete(id: string) {
    await prisma.tag.delete({
      where: {
        id,
      },
    });
  }
}
