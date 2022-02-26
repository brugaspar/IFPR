import { NextFunction, Request, Response } from "express";

import { AppError } from "../handlers/AppError";

export class ErrorMiddleware {
  static async handle(error: any, request: Request, response: Response, next: NextFunction) {
    if (error instanceof AppError) {
      return response.status(error.status).json({
        message: error.message,
      });
    }

    console.log(error);

    return response.status(500).json({
      message: "Erro interno no servidor, tente novamente",
    });
  }
}
