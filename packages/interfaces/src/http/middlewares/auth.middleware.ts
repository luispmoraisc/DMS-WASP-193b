import { MeUseCase } from "@dms/application/use-cases";
import { NextFunction, Request, Response } from "express";
import { DependencyContainer } from "tsyringe";

export const protectedRoute = async (
  container: DependencyContainer,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const useCase = container.resolve<MeUseCase>("MeUseCase");
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const response = await useCase.execute(
    { access_token: token },
    { traceId: req.traceId }
  );

  console.log(response);

  next();
};
