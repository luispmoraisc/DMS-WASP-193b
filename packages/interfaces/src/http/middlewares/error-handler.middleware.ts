import { AppError } from "@dms/shared/appError";
import { logger } from "@dms/shared/logger";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const errorHandlerMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    logger.error({ err }, "AppError");
    return res.status(err.status).json({
      code: err.code,
      message: err.message,
      details: err.details,
    });
  }

  if (err instanceof ZodError) {
    logger.warn({ err }, "ZodError");
    return res.status(400).json({
      message: "Validation Error",
      code: "validation_error",
      details: err.issues.map((e: any) => ({
        path: e.path[0],
        message: e.message,
      })),
    });
  }

  logger.error({ err }, "Unhandled Error");
  return res
    .status(500)
    .json({ message: "Internal Server Error", code: "internal_server_error" });
};
