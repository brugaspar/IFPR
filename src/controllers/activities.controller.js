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
const activities_repository_1 = __importDefault(require("../repositories/activities.repository"));
class ActivitiesController {
    async store(request, response) {
        const activity = request.body;
        const schema = {
            status: yup.string().required(),
            total: yup.number().required(),
            totalQuantity: yup.number().required(),
            totalItems: yup.number().required(),
            observation: yup.string(),
            cancelledReason: yup.string(),
            sellerId: yup.string().required(),
            memberId: yup.string().required(),
            finishedAt: yup.string(),
            items: yup.array(yup.object().shape({
                productId: yup.string().required(),
                quantity: yup.number().required(),
                price: yup.number().required(),
            })),
        };
        await (0, schema_handler_1.checkBodySchema)(schema, request.body);
        await (0, request_helper_1.checkRequestUser)(request.userId);
        const parsedActivity = {
            ...activity,
            items: undefined,
        };
        const storedActivity = await activities_repository_1.default.store(parsedActivity, request.userId);
        for (const item of activity.items) {
            await activities_repository_1.default.storeItem({
                ...item,
                activityId: storedActivity,
                subtotal: item.price * item.quantity,
            });
        }
        return response.status(201).json({ id: storedActivity });
    }
    async index(request, response) {
        const { search = "" } = request.query;
        await (0, request_helper_1.checkRequestUser)(request.userId);
        const activities = await activities_repository_1.default.findAll({
            search,
        });
        return response.status(200).json(activities);
    }
    async show(request, response) {
        const id = request.params.id;
        await (0, request_helper_1.checkRequestUser)(request.userId);
        const activity = await activities_repository_1.default.findById(id);
        if (!activity) {
            throw new errors_handler_1.AppError("Atividade não encontrada");
        }
        return response.status(200).json(activity);
    }
    async update(request, response) {
        const activity = request.body;
        const id = request.params.id;
        const schema = {
            status: yup.string(),
            total: yup.number(),
            totalQuantity: yup.number(),
            totalItems: yup.number(),
            observation: yup.string(),
            cancelledReason: yup.string(),
            sellerId: yup.string(),
            memberId: yup.string(),
            finishedAt: yup.string(),
            items: yup.array(yup.object().shape({
                productId: yup.string(),
                quantity: yup.number(),
                price: yup.number(),
            })),
        };
        await (0, schema_handler_1.checkBodySchema)(schema, request.body);
        await (0, request_helper_1.checkRequestUser)(request.userId);
        const activityExists = await activities_repository_1.default.findById(id);
        if (!activityExists) {
            throw new errors_handler_1.AppError("Atividade não encontrado");
        }
        const parsedActivity = {
            ...activity,
            items: undefined,
        };
        const updatedActivity = await activities_repository_1.default.update({
            activity: parsedActivity,
            requestUserId: request.userId,
            activityId: id,
        });
        // if (activity.items) {
        //   for (const item of activity.items) {
        //     await activitiesRepository.updateItem(
        //       {
        //         price: item.price,
        //         quantity: item.quantity,
        //         subtotal: item.price * item.quantity,
        //       },
        //       item.id || ""
        //     )
        //   }
        // }
        return response.status(200).json({ id: updatedActivity });
    }
}
exports.default = new ActivitiesController();
