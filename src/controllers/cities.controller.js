"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_helper_1 = require("../helpers/request.helper");
const cities_repository_1 = __importDefault(require("../repositories/cities.repository"));
class CitiesController {
    async index(request, response) {
        const { search = "" } = request.query;
        await (0, request_helper_1.checkRequestUser)(request.userId);
        const cities = await cities_repository_1.default.findAll({
            search,
        });
        return response.status(200).json(cities);
    }
}
exports.default = new CitiesController();
