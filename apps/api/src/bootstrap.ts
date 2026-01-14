import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { container as tsyringecontainer } from "tsyringe";

import {
  createApiRoutes,
  errorHandlerMiddleware,
  promMiddleware,
  traceIdMiddleware,
} from "@dms/interfaces/http";
import { configureContainer } from "@dms/shared/container";
import { Logger } from "@dms/shared/logger";
import { collectDefaultMetrics, register } from "prom-client";

const bootstrap = async (logger: Logger) => {
  const container = configureContainer(tsyringecontainer, logger);
  collectDefaultMetrics({ register });
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    cors({
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      origin: [
        "http://localhost:3000",
        "http://localhost:9090",
        "http://localhost:4000",
        "http://localhost:3001",
        "http://localhost:5173",
        "http://localhost:4200",
      ],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Refresh-Token",
        "X-Trace-Id",
        "x-organization-id",
      ],
      exposedHeaders: ["Authorization", "Refresh-Token", "X-Trace-Id"],
      credentials: true,
    })
  );
  app.use(compression());
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  app.use(express.json());
  app.use(promMiddleware);
  // Routes
  app.use(createApiRoutes(container));

  // Metrics
  // app.use(metricsMiddleware);
  app.use(traceIdMiddleware);
  // Error handler
  app.use(errorHandlerMiddleware);

  return app;
};

export default bootstrap;
