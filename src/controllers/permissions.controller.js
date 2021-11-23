"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_helper_1 = require("../helpers/request.helper");
const permissions_repository_1 = __importDefault(require("../repositories/permissions.repository"));
class PermissionsController {
    async index(request, response) {
        const { tableId } = request.query;
        await (0, request_helper_1.checkRequestUser)(request.userId);
        const permissions = await permissions_repository_1.default.findAll({
            tableId,
        });
        return response.status(200).json(permissions);
    }
}
exports.default = new PermissionsController();
