import { Router } from "express";

import { TagController } from "./application/controllers/TagController";
import { TagRepository } from "./application/repositories/TagRepository";
import { QuestionController } from "./application/controllers/QuestionController";
import { ExamController } from "./application/controllers/ExamController";

import { AlternativeRepository } from "./application/repositories/AlternativeRepository";
import { QuestionRepository } from "./application/repositories/QuestionRepository";
import { ExamRepository } from "./application/repositories/ExamRepository";
import { ExamQuestionRepository } from "./application/repositories/ExamQuestionRepository";

const tagRepository = new TagRepository();
const tagController = new TagController(tagRepository);
const questionController = new QuestionController(new QuestionRepository(), tagRepository, new AlternativeRepository());
const examController = new ExamController(new ExamRepository(), new QuestionRepository(), new ExamQuestionRepository());

const router = Router();

// Tag routes
router.post("/tags", (request, response) => tagController.create(request, response));
router.get("/tags", (request, response) => tagController.findAll(request, response));
router.put("/tags/:id", (request, response) => tagController.update(request, response));
router.delete("/tags/:id", (request, response) => tagController.delete(request, response));

// Question routes
router.post("/questions", (request, response) => questionController.create(request, response));
router.get("/questions", (request, response) => questionController.findAll(request, response));
router.put("/questions/:id", (request, response) => questionController.update(request, response));
router.delete("/questions/:id", (request, response) => questionController.delete(request, response));

// Exam routes
router.post("/exams", (request, response) => examController.create(request, response));
router.get("/exams", (request, response) => examController.findAll(request, response));
router.get("/exams/:id", (request, response) => examController.findById(request, response));
router.put("/exams/:id", (request, response) => examController.update(request, response));
router.delete("/exams/:id", (request, response) => examController.delete(request, response));

export { router };
