import "reflect-metadata";
import type { DependencyContainer } from "tsyringe";
import type { Logger } from "./logger.js";

export const configureContainer = (
  container: DependencyContainer,
  logger: Logger
) => {
  container.register<Logger>("Logger", {
    useValue: logger,
  });
  return container;
};
