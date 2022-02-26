import { Request, Response } from "express";

import { AppError } from "../handlers/AppError";
import { Tag } from "../../domain/entities/Tag";
import { TagRepository } from "../repositories/TagRepository";

export class TagController {
  constructor(private tagRepository: TagRepository) {}

  async create(request: Request, response: Response) {
    const { name, description } = request.body;

    const tagAlreadyExists = await this.tagRepository.findByName(name.trim());

    if (tagAlreadyExists) {
      throw new AppError("Essa TAG já existe");
    }

    const { props } = Tag.create({
      name: name.trim(),
      description,
    });

    const tag = await this.tagRepository.save(props);

    return response.status(201).json(tag);
  }

  async findAll(request: Request, response: Response) {
    const tags = await this.tagRepository.findAll();
    return response.status(200).json(tags);
  }
}
