import { ZodError } from "zod";
import { NextFunction, Request, Response } from "express";
import { logger } from "@dms/shared/logger";
import { AppError } from "@dms/shared/appError";

export const errorHandlerMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    logger.error({ err }, "AppError");
    return res.status(err.status).json({
      error: err.message,
      details: err.details,
    });
  }

  if (err instanceof ZodError) {
    logger.warn({ err }, "ZodError");
    return res.status(400).json({
      error: "Validation Error",
      details: err.issues.map((e: any) => ({
        path: e.path[0],
        message: e.message,
      })),
    });
  }

  logger.error({ err }, "Unhandled Error");
  return res.status(500).json({ error: "Internal Server Error" });
};
