import { inject, injectable } from "tsyringe";
import type { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

import { SignInUseCase, SignUpUseCase } from "@dms/application/use-cases";
import { signInUpSchema, TSignInUpSchema } from "@dms/domain/schemas";

@injectable()
export class UserController {
  constructor(
    @inject("SignInUseCase") private signInUseCase: SignInUseCase,
    @inject("SignUpUseCase") private signUpUseCase: SignUpUseCase
  ) {}

  async signIn(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const traceId = (req.headers["x-trace-id"] as string) ?? randomUUID();
      const validatedBody: TSignInUpSchema = signInUpSchema.parse(req.body);
      const user = await this.signInUseCase.execute(validatedBody, {
        traceId,
      });

      if (!user) {
        res.sendStatus(401);
        return;
      }

      res.cookie("access_token", user.access_token, {
        httpOnly: true,
        secure: true,
      });
      res.cookie("refresh_token", user.refresh_token, {
        httpOnly: true,
        secure: true,
      });

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const traceId = (req.headers["x-trace-id"] as string) ?? randomUUID();
      const validatedBody: TSignInUpSchema = signInUpSchema.parse(req.body);
      await this.signUpUseCase.execute(validatedBody, { traceId });

      res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  }
}
