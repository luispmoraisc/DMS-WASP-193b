import { Router } from "express";
import { DependencyContainer } from "tsyringe";
import { UserController } from "../controllers/user.controller";

export const userRoutes = (container: DependencyContainer) => {
  const router = Router();
  const userController = container.resolve(UserController);

  router.post("/sign-up", userController.signUp.bind(userController));
  router.post("/sign-in", userController.signIn.bind(userController));

  return router;
};
