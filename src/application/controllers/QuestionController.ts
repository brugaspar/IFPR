import { Request, Response } from "express";

import { AppError } from "../handlers/AppError";
import { QuestionDifficulty, QuestionRepository, QuestionType } from "../repositories/QuestionRepository";
import { AlternativeRepository } from "../repositories/AlternativeRepository";
import { TagRepository } from "../repositories/TagRepository";
import { QuestionFactory } from "../../domain/factories/QuestionFactory";
import { Alternative } from "../../domain/entities/Alternative";

type AlternativeProps = {
  title: string;
  isCorrect: boolean;
};

type QuestionRequest = {
  title: string;
  description: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  tagId: string;
  alternatives: AlternativeProps[];
};

export class QuestionController {
  constructor(
    private questionRepository: QuestionRepository,
    private tagRepository: TagRepository,
    private alternativeRepository: AlternativeRepository
  ) {}

  async create(request: Request, response: Response) {
    const { title, description, type, difficulty, tagId, alternatives }: QuestionRequest = request.body;

    const tagExists = await this.tagRepository.findById(tagId);

    if (!tagExists) {
      throw new AppError("Essa TAG não existe");
    }

    const { props } = QuestionFactory.create(type, {
      title,
      description,
      difficulty,
      tagId,
    });

    const question = await this.questionRepository.save(props);

    if (type !== "open") {
      if (!alternatives || !alternatives.length) {
        // TODO: delete question and alternatives

        throw new AppError("Alternativas são necessárias em questões de múltipla escolha");
      }

      for (const alternative of alternatives) {
        const { props: alternativeProps } = Alternative.create({
          ...alternative,
          questionId: question.id,
        });

        await this.alternativeRepository.save(alternativeProps);
      }
    }

    const storedQuestion = await this.questionRepository.findById(question.id);

    return response.status(201).json(storedQuestion);
  }

  async findAll(request: Request, response: Response) {
    const questions = await this.questionRepository.findAll();
    return response.status(200).json(questions);
  }
}
