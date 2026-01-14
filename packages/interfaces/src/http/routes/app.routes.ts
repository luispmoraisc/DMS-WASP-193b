import { Router } from "express";
import { DependencyContainer } from "tsyringe";
import { register } from "prom-client";

import { profileRoutes } from "./profile.routes";
import { userRoutes } from "./user.routes";
import { protectRoute } from "../middlewares/auth.middleware";

export const createApiRoutes = (container: DependencyContainer) => {
  const router = Router();

  // Health check
  router.get("/health", (req, res) => {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "rest api dms-wasp-193b",
    });
  });

  // Metrics
  router.get("/metrics", async (req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  });

  // API Routes v1
  const v1Router = Router();

  v1Router.use(
    "/profiles",
    (req, res, next) => protectRoute(container, req, res, next),
    profileRoutes(container)
  );
  v1Router.use("/auth", userRoutes(container));
  router.use("/api/v1", v1Router);

  return router;
};
