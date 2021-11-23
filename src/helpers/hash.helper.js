"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function hashPassword(password) {
    return await bcryptjs_1.default.hash(password, 10);
}
exports.hashPassword = hashPassword;
async function comparePassword(password, hashedPassword) {
    return await bcryptjs_1.default.compare(password, hashedPassword);
}
exports.comparePassword = comparePassword;
