import { NextFunction, Request, Response } from "express";
import {
  httpRequestDuration,
  httpRequestsTotal,
} from "../metrics/http.metrics";

export const promMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const end = httpRequestDuration.startTimer();

  res.on("finish", () => {
    const labels = {
      method: req.method,
      route: req.path,
      status: res.statusCode,
    };

    httpRequestsTotal.inc(labels);
    end(labels);
  });

  next();
};
