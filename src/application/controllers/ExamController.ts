import { Request, Response } from "express";

import { AppError } from "../handlers/AppError";

import { Exam } from "../../domain/entities/Exam";
import { ExamQuestion } from "../../domain/entities/ExamQuestion";

import { ExamRepository } from "../repositories/ExamRepository";
import { QuestionDifficulty, QuestionRepository, QuestionType } from "../repositories/QuestionRepository";
import { ExamQuestionRepository } from "../repositories/ExamQuestionRepository";

type ExamRequest = {
  title: string;
  description: string;
  status: "draft" | "published" | "waiting_for_review" | "finished";
  questionsQuantity: number;
  questionsDifficulties: QuestionDifficulty[];
  questionsTypes: QuestionType[];
  questionsTags: string[];
};

export class ExamController {
  constructor(
    private examRepository: ExamRepository,
    private questionRepository: QuestionRepository,
    private examQuestionRepository: ExamQuestionRepository
  ) {}

  async create(request: Request, response: Response) {
    const {
      title,
      description,
      status,
      questionsQuantity = 10,
      questionsDifficulties,
      questionsTags,
      questionsTypes,
    }: ExamRequest = request.body;

    if (!title) {
      throw new AppError("Título é obrigatório");
    }

    let difficulties: QuestionDifficulty[] = ["easy", "medium", "hard"];

    if (questionsDifficulties.length > 0) {
      difficulties = questionsDifficulties;
    }

    let tags: string[];

    if (questionsTags.length > 0) {
      tags = questionsTags;
    }

    let types: QuestionType[] = ["open", "single", "multiple"];

    if (questionsTypes.length > 0) {
      types = questionsTypes;
    }

    const count = await this.questionRepository.findCount();

    let records = Number(questionsQuantity);

    if (count < Number(questionsQuantity)) {
      records = count;
    }

    const questions = await this.questionRepository.findAll({
      difficulties,
      tags,
      records,
      types,
    });

    if (!questions.length) {
      throw new AppError("Não há questões disponíveis para a prova, tente novamente!");
    }

    const { props } = Exam.create({
      title: title.trim(),
      description: description && description.trim(),
      status,
    });

    const exam = await this.examRepository.save(props);

    for (const question of questions) {
      const { props: questionProps } = ExamQuestion.create({
        examId: exam.id,
        questionId: question.id,
      });

      await this.examQuestionRepository.save(questionProps);
    }

    const storedExam = await this.examRepository.findById(exam.id);

    return response.status(201).json(storedExam);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { title, description, status } = request.body;

    const examExists = await this.examRepository.findById(id);

    if (!examExists) {
      throw new AppError("Prova não encontrada");
    }

    // if (examExists.status !== "draft") {
    //   throw new AppError("Prova não pode ser alterada, já foi publicada ou está finalizada");
    // }

    const { props } = Exam.create({
      title: title.trim(),
      description: description && description.trim(),
      status,
    });

    await this.examRepository.update({ id, ...props });

    const storedExam = await this.examRepository.findById(id);

    return response.status(201).json(storedExam);
  }

  async findAll(request: Request, response: Response) {
    const exams = await this.examRepository.findAll();
    return response.status(200).json(exams);
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const exam = await this.examRepository.findById(id);

    if (!exam) {
      throw new AppError("Prova não encontrada");
    }

    return response.status(200).json(exam);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const examExists = await this.examRepository.findById(id);

    if (!examExists) {
      throw new AppError("Questão não encontrada");
    }

    await this.examRepository.delete(id);

    return response.status(200).json({
      message: "Prova excluída com sucesso",
    });
  }
}
