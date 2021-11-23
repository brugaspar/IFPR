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
const brands_repository_1 = __importDefault(require("../repositories/brands.repository"));
class ProductsBrandsController {
    async store(request, response) {
        const productBrand = request.body;
        const schema = {
            name: yup.string().required("Nome é obrigatório"),
            disabled: yup.boolean(),
        };
        await (0, schema_handler_1.checkBodySchema)(schema, request.body);
        await (0, request_helper_1.checkRequestUser)(request.userId);
        const storedProductBrand = await brands_repository_1.default.store(productBrand, request.userId);
        return response.status(201).json({ id: storedProductBrand });
    }
    async index(request, response) {
        const { onlyEnabled = true, search = "" } = request.query;
        await (0, request_helper_1.checkRequestUser)(request.userId);
        const productsBrands = await brands_repository_1.default.findAll({
            onlyEnabled: JSON.parse(onlyEnabled),
            search,
        });
        return response.status(200).json(productsBrands);
    }
    async show(request, response) {
        const id = request.params.id;
        await (0, request_helper_1.checkRequestUser)(request.userId);
        const productBrand = await brands_repository_1.default.findById(id);
        if (!productBrand) {
            throw new errors_handler_1.AppError("Marca não encontrada");
        }
        return response.status(200).json(productBrand);
    }
    async update(request, response) {
        const productBrand = request.body;
        const id = request.params.id;
        const schema = {
            name: yup.string(),
            disabled: yup.boolean(),
        };
        await (0, schema_handler_1.checkBodySchema)(schema, request.body);
        await (0, request_helper_1.checkRequestUser)(request.userId);
        const productBrandExists = await brands_repository_1.default.findById(id);
        if (!productBrandExists) {
            throw new errors_handler_1.AppError("Marca não encontrada");
        }
        const updatedProductBrand = await brands_repository_1.default.update({
            productBrand,
            requestUserId: request.userId,
            productBrandId: id,
        });
        return response.status(200).json({ id: updatedProductBrand });
    }
}
exports.default = new ProductsBrandsController();
