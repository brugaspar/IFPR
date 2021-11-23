"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveError = void 0;
const luxon_1 = require("luxon");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function saveError(error) {
    const formattedDateTime = luxon_1.DateTime.now().toFormat("dd/MM/yyyy - HH:mm:ss");
    const formattedDate = luxon_1.DateTime.now().toFormat("yyMMdd");
    const time = new Date().getTime();
    const resolvedPath = path_1.default.resolve(__dirname, "..", "..", "errors");
    if (!fs_1.default.existsSync(resolvedPath)) {
        fs_1.default.mkdirSync(resolvedPath);
    }
    const errorFile = `${resolvedPath}/${formattedDate}-app-error-${time}.txt`;
    const data = `Erro na aplicação | ${formattedDateTime}\nError: ${error.message}`;
    fs_1.default.writeFile(errorFile, data, (error) => {
        if (error)
            console.log(error);
    });
}
exports.saveError = saveError;
