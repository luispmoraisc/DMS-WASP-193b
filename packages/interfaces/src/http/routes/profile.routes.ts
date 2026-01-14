import { Router } from "express";
import { DependencyContainer } from "tsyringe";
import { ProfileController } from "../controllers/profile.controller";

export const profileRoutes = (container: DependencyContainer) => {
  const router = Router();
  const profileController = container.resolve(ProfileController);

  router.get("/", (req, res) => {
    res.status(200).json({ message: "Profile route is working!" });
  });
  router.patch("/:id", profileController.update.bind(profileController));

  return router;
};
