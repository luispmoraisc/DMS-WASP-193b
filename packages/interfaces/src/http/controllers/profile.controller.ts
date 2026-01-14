import { inject, injectable } from "tsyringe";
import type { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

import { UpdateProfileUseCase } from "@dms/application/use-cases";
import { updateProfileSchema, TUpdateProfileSchema } from "@dms/domain/schemas";

@injectable()
export class ProfileController {
  constructor(
    @inject("UpdateProfileUseCase")
    private updateProfileUseCase: UpdateProfileUseCase
  ) {}

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const traceId = (req.headers["x-trace-id"] as string) ?? randomUUID();
      const validatedBody: TUpdateProfileSchema = updateProfileSchema.parse(
        req.body
      );
      const result = await this.updateProfileUseCase.execute(validatedBody, {
        traceId,
      });

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}
