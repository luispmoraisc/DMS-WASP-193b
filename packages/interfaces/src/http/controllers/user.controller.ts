import { randomUUID } from "crypto";
import type { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";

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
      const session = await this.signInUseCase.execute(validatedBody, {
        traceId,
      });

      if (!session) {
        res.sendStatus(401);
        return;
      }

      res.cookie("access_token", session.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });
      res.cookie("refresh_token", session.refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });

      res.sendStatus(200);
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
