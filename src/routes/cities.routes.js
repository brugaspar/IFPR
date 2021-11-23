"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_middleware_1 = require("../middlewares/authentication.middleware");
const cities_controller_1 = __importDefault(require("../controllers/cities.controller"));
const citiesRouter = (0, express_1.Router)();
citiesRouter.get("/cities", authentication_middleware_1.authenticationMiddleware, cities_controller_1.default.index);
exports.default = citiesRouter;
