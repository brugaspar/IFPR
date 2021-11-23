"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup = __importStar(require("yup"));
const errors_handler_1 = require("../handlers/errors.handler");
const schema_handler_1 = require("../handlers/schema.handler");
const request_helper_1 = require("../helpers/request.helper");
const plans_repository_1 = __importDefault(require("../repositories/plans.repository"));
class PlansController {
    async store(request, response) {
        const plan = request.body;
        const schema = {
            name: yup.string().required("Nome é obrigatório"),
            description: yup.string(),
            value: yup.number().required("Valor é obrigatório"),
            renewValue: yup.number().required("Valor de renovação é obrigatório"),
            gunTargetDiscount: yup.number().required("Desconto de armas e alvos é obrigatório"),
            courseDiscount: yup.number().required("Desconto de cursos é obrigatório"),
            shootingDrillsPerYear: yup.number().required("Qtde. de treinos de tiro por ano é obrigatório"),
            gunExemption: yup.boolean().required("Isenção de aluguel de armas é obrigatório"),
            targetExemption: yup.boolean().required("Isenção de aluguel de alvos é obrigatório"),
            disabled: yup.boolean(),
        };
        await (0, schema_handler_1.checkBodySchema)(schema, request.body);
        await (0, request_helper_1.checkRequestUser)(request.userId);
        const storedPlan = await plans_repository_1.default.store(plan, request.userId);
        return response.status(201).json({ id: storedPlan });
    }
    async index(request, response) {
        const { onlyEnabled = true, search = "" } = request.query;
        await (0, request_helper_1.checkRequestUser)(request.userId);
        const plans = await plans_repository_1.default.findAll({
            onlyEnabled: JSON.parse(onlyEnabled),
            search,
        });
        return response.status(200).json(plans);
    }
    async show(request, response) {
        const id = request.params.id;
        await (0, request_helper_1.checkRequestUser)(request.userId);
        const plan = await plans_repository_1.default.findById(id);
        if (!plan) {
            throw new errors_handler_1.AppError("Plano não encontrado");
        }
        return response.status(200).json(plan);
    }
    async update(request, response) {
        const plan = request.body;
        const id = request.params.id;
        const schema = {
            name: yup.string(),
            description: yup.string(),
            value: yup.number(),
            renewValue: yup.number(),
            gunTargetDiscount: yup.number(),
            courseDiscount: yup.number(),
            shootingDrillsPerYear: yup.number(),
            gunExemption: yup.boolean(),
            targetExemption: yup.boolean(),
            disabled: yup.boolean(),
        };
        await (0, schema_handler_1.checkBodySchema)(schema, request.body);
        await (0, request_helper_1.checkRequestUser)(request.userId);
        const updatedPlan = await plans_repository_1.default.update({
            plan,
            requestUserId: request.userId,
            planId: id,
        });
        return response.status(200).json({ id: updatedPlan });
    }
}
exports.default = new PlansController();
