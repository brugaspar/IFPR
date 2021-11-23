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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBodySchema = void 0;
const yup = __importStar(require("yup"));
const errors_handler_1 = require("./errors.handler");
async function checkBodySchema(schema, requestBody) {
    const yupSchema = yup.object().shape(schema);
    try {
        await yupSchema.validate(requestBody, { abortEarly: false });
    }
    catch (error) {
        if (error.errors) {
            throw new errors_handler_1.AppError(error.errors);
        }
    }
}
exports.checkBodySchema = checkBodySchema;
