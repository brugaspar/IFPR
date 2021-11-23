"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_helper_1 = require("../helpers/request.helper");
const logs_repository_1 = __importDefault(require("../repositories/logs.repository"));
class LogsController {
    async index(request, response) {
        await (0, request_helper_1.checkRequestUser)(request.userId);
        const logs = await logs_repository_1.default.findAll();
        return response.status(200).json(logs);
    }
}
exports.default = new LogsController();
