import { Router } from "express";

import { TagController } from "./application/controllers/TagController";
import { TagRepository } from "./application/repositories/TagRepository";

const tagRepository = new TagRepository();
const tagController = new TagController(tagRepository);

const router = Router();

router.post("/tags", (request, response) => tagController.create(request, response));
router.get("/tags", (request, response) => tagController.findAll(request, response));

export { router };
