import "reflect-metadata";
import { config } from "dotenv";

config();

import { logger } from "@dms/shared/logger";
import bootstrap from "./bootstrap";

bootstrap(logger)
  .then((app) => {
    logger.info("🚀 Wasp-193b app started successfully 🚀");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      logger.info(`API listening on http://localhost:${PORT}`);
      logger.info(
        `Swagger documentation available at http://localhost:${PORT}/api-docs`
      );
      logger.info(`Health check at http://localhost:${PORT}/health`);
      logger.info(`Metrics at http://localhost:${PORT}/metrics`);
    });
  })
  .catch((error) => {
    logger.error("❌❌❌ Failed to start Wasp-193b app:", error);
    process.exit(1);
  });
