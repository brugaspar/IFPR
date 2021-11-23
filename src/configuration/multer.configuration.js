"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const destinationPath = path_1.default.resolve(__dirname, "..", "..", "uploads");
const local = multer_1.default.diskStorage({
    destination: (request, file, callback) => {
        if (!fs_1.default.existsSync(destinationPath)) {
            fs_1.default.mkdirSync(destinationPath);
        }
        callback(null, destinationPath);
    },
    filename: (request, file, callback) => {
        crypto_1.default.randomBytes(16, (error, hash) => {
            if (error) {
                callback(error, "");
            }
            file.key = `${hash.toString("hex")}-${file.originalname}`;
            callback(null, file.key);
        });
    },
});
const THREE_MB = 1024 * 1024 * 3;
const multerConfiguration = {
    dest: destinationPath,
    storage: local,
    limits: {
        fileSize: THREE_MB,
    },
    fileFilter: (request, file, callback) => {
        const allowedMimes = ["image/jpeg", "image/pjpeg", "image/png", "application/pdf"];
        if (allowedMimes.includes(file.mimetype)) {
            callback(null, true);
        }
        else {
            callback(new Error("Formato de arquivo inválido"));
        }
    },
};
exports.default = multerConfiguration;
