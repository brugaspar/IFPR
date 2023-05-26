import { Request, Response } from "express";

import { AppError } from "../handlers/AppError";
import { Tag } from "../../domain/entities/Tag";
import { TagRepository } from "../repositories/TagRepository";

export class TagController {
  constructor(private tagRepository: TagRepository) {}

  async create(request: Request, response: Response) {
    const { name, description } = request.body;

    if (!name) {
      throw new AppError("Nome é obrigatório");
    }

    const tagAlreadyExists = await this.tagRepository.findByName(name.trim());

    if (tagAlreadyExists) {
      throw new AppError("Essa tag já existe");
    }

    const { props } = Tag.create({
      name: name.trim(),
      description: description && description.trim(),
    });

    const tag = await this.tagRepository.save(props);

    return response.status(201).json(tag);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, description } = request.body;

    const tagExists = await this.tagRepository.findById(id);

    if (!tagExists) {
      throw new AppError("Essa tag não existe");
    }

    if (name && name !== tagExists.name) {
      const nameAlreadyExists = await this.tagRepository.findByName(name.trim());

      if (nameAlreadyExists) {
        throw new AppError("Essa tag já existe");
      }
    }

    const updatedTag = await this.tagRepository.update({
      id,
      name: name && name.trim(),
      description: description && description.trim(),
    });

    return response.status(200).json(updatedTag);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const tagExists = await this.tagRepository.findById(id);

    if (!tagExists) {
      throw new AppError("Essa tag não existe");
    }

    await this.tagRepository.delete(id);

    return response.status(200).json({
      message: "Tag excluída com sucesso",
    });
  }

  async findAll(request: Request, response: Response) {
    const tags = await this.tagRepository.findAll();
    return response.status(200).json(tags);
  }
}
