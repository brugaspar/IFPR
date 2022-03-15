import { Request, Response } from "express";

import { AppError } from "../handlers/AppError";

import { Exam } from "../../domain/entities/Exam";

import { ExamRepository } from "../repositories/ExamRepository";
import { QuestionDifficulty, QuestionRepository, QuestionType } from "../repositories/QuestionRepository";

type ExamRequest = {
  title: string;
  description: string;
  questionsQuantity: number;
  questionsDifficulties: QuestionDifficulty[];
  questionsTypes: QuestionType[];
  questionsTags: string[];
};

export class ExamController {
  constructor(private examRepository: ExamRepository, private questionRepository: QuestionRepository) {}

  async create(request: Request, response: Response) {
    const {
      title,
      description,
      questionsQuantity = 10,
      questionsDifficulties,
      questionsTags,
      questionsTypes,
    }: ExamRequest = request.body;

    if (!title) {
      throw new AppError("Título é obrigatório");
    }

    let difficulties: QuestionDifficulty[] = ["easy", "medium", "hard"];

    if (difficulties) {
      difficulties = questionsDifficulties;
    }

    let tags: string[] = [];

    if (questionsTags) {
      tags = questionsTags;
    }

    let types: QuestionType[] = ["open", "single", "multiple"];

    if (questionsTypes) {
      types = questionsTypes;
    }

    const questions = await this.questionRepository.findAll({
      difficulties,
      tags,
      records: questionsQuantity,
      types,
    });
  }
}
