import { Router } from "express";
import { DependencyContainer } from "tsyringe";
import { FileController } from "../controllers/file.controller";

export const fileRoutes = (container: DependencyContainer) => {
  const router = Router();
  const fileController = container.resolve(FileController);

  router.get("/", (req, res) => {
    res.status(200).json({ message: "File route is working!" });
  });
  router.post("/process", fileController.process.bind(fileController));

  return router;
};
