import { randomUUID } from "crypto";
import type { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";

import { ProcessFileUseCase } from "@dms/application/use-cases";
import { processFileSchema, TProcessFileSchema } from "@dms/domain/schemas";

@injectable()
export class FileController {
  constructor(
    @inject("ProcessFileUseCase")
    private processFileUseCase: ProcessFileUseCase
  ) {}

  async process(req: Request, res: Response, next: NextFunction) {
    try {
      const traceId = (req.headers["x-trace-id"] as string) ?? randomUUID();
      const validatedBody: TProcessFileSchema = processFileSchema.parse(
        req.body
      );
      const result = await this.processFileUseCase.execute(validatedBody, {
        traceId,
      });

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}
