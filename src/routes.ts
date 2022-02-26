import { Router } from "express";

import { TagController } from "./application/controllers/TagController";
import { TagRepository } from "./application/repositories/TagRepository";
import { QuestionController } from "./application/controllers/QuestionController";
import { AlternativeRepository } from "./application/repositories/AlternativeRepository";
import { QuestionRepository } from "./application/repositories/QuestionRepository";

const tagRepository = new TagRepository();
const tagController = new TagController(tagRepository);
const questionController = new QuestionController(new QuestionRepository(), tagRepository, new AlternativeRepository());

const router = Router();

router.post("/tags", (request, response) => tagController.create(request, response));
router.get("/tags", (request, response) => tagController.findAll(request, response));

router.post("/questions", (request, response) => questionController.create(request, response));
router.get("/questions", (request, response) => questionController.findAll(request, response));

export { router };
