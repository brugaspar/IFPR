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

type QuestionUpdate = QuestionRequest & {
  alternatives: AlternativeProps[] & { id: string; toDelete: boolean }[];
};

export class QuestionController {
  constructor(
    private questionRepository: QuestionRepository,
    private tagRepository: TagRepository,
    private alternativeRepository: AlternativeRepository
  ) {}

  async create(request: Request, response: Response) {
    const { title, description, type, difficulty, tagId, alternatives }: QuestionRequest = request.body;

    if (!title) {
      throw new AppError("Título é obrigatório");
    }

    if (!type) {
      throw new AppError("Tipo é obrigatório");
    }

    if (!tagId) {
      throw new AppError("Tag é obrigatório");
    }

    const tagExists = await this.tagRepository.findById(tagId);

    if (!tagExists) {
      throw new AppError("Essa tag não existe");
    }

    const { props } = QuestionFactory.create(type, {
      title: title.trim(),
      description: description && description.trim(),
      difficulty,
      tagId,
    });

    const question = await this.questionRepository.save(props);

    if (type !== "open") {
      if (!alternatives || !alternatives.length) {
        await this.questionRepository.delete(question.id);
        throw new AppError("Alternativas são necessárias em questões de única ou múltipla escolha");
      }

      const isCorrectCount = alternatives.map((alternative) => alternative.isCorrect).filter((isCorrect) => isCorrect).length;

      if (isCorrectCount > 1 && type === "single") {
        await this.questionRepository.delete(question.id);
        throw new AppError("Só é permitido uma alternativa correta em questões de única escolha");
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

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { title, description, type, difficulty, tagId, alternatives }: QuestionUpdate = request.body;

    const questionExists = await this.questionRepository.findById(id);

    if (!questionExists) {
      throw new AppError("Questão não encontrada");
    }

    const parsedType = type ?? questionExists.type;

    if (tagId) {
      const tagExists = await this.tagRepository.findById(tagId);

      if (!tagExists) {
        throw new AppError("Essa tag não existe");
      }
    }

    if (parsedType === "single") {
      const correctAlternativesCount = alternatives
        ?.map((alternative) => alternative.isCorrect)
        .filter((isCorrect) => isCorrect).length;

      const questionsCorrectAlternativesCount = questionExists.alternatives
        .map((alternative) => alternative.isCorrect)
        .filter((isCorrect) => isCorrect).length;

      if (correctAlternativesCount > 1 || (correctAlternativesCount > 1 && questionsCorrectAlternativesCount >= 1)) {
        throw new AppError("Só é permitido 1 alternativa correta em questões de única escolha");
      }

      if (questionsCorrectAlternativesCount > 1) {
        throw new AppError("Essa questão possui mais de uma alternativa correta");
      }
    }

    const { props } = QuestionFactory.create(parsedType, {
      title: title && title.trim(),
      description: description && description.trim(),
      difficulty,
      tagId,
    });

    await this.questionRepository.update({ id, ...props });

    if (alternatives && alternatives.length) {
      if (parsedType === "open") {
        throw new AppError("Alternativas não são permitidas em questões de texto aberto");
      }

      for (const singleAlternative of alternatives) {
        const { toDelete, ...alternative } = singleAlternative;

        if (alternative.id) {
          const alternativeExists = await this.alternativeRepository.findById(alternative.id);

          if (!alternativeExists) {
            throw new AppError("Alternativa não encontrada");
          }

          if (toDelete) {
            await this.alternativeRepository.delete(alternative.id);
          } else {
            const { props: alternativeProps } = Alternative.create({
              ...alternative,
              questionId: id,
            });

            await this.alternativeRepository.update({ id: alternative.id, ...alternativeProps });
          }
        } else {
          const { props: alternativeProps } = Alternative.create({
            ...alternative,
            questionId: id,
          });

          await this.alternativeRepository.save(alternativeProps);
        }
      }
    }

    const storedQuestion = await this.questionRepository.findById(id);

    return response.status(201).json(storedQuestion);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const questionExists = await this.questionRepository.findById(id);

    if (!questionExists) {
      throw new AppError("Questão não encontrada");
    }

    await this.questionRepository.delete(id);

    return response.status(200).json({
      message: "Questão excluída com sucesso",
    });
  }

  async findAll(request: Request, response: Response) {
    const questions = await this.questionRepository.findAll();
    return response.status(200).json(questions);
  }
}
