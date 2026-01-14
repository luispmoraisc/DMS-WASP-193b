import { NextFunction, Request, Response } from "express";
import { randomUUID } from "crypto";

import { logger } from "@dms/shared/logger";

export const traceIdMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  req.traceId = req.headers["x-trace-id"]?.toString() ?? randomUUID();
  logger.info({ traceId: req.traceId }, "Trace ID assigned to request");
  next();
};
