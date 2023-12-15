import { ClassConstructor, plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { getDecoratorsRequest } from "../getArgsRequest";
import { validate } from "class-validator";
import { BadRequestException } from "../../../errors/badRequest";

export const ValidationPipe = (
  controller: ClassConstructor<unknown>,
  handler: string
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const args = getDecoratorsRequest(controller, handler, req);
    const errors: any[] = [];
    for (const detailRequest of args.detail) {
      const validateRequest = await validate(
        Object.assign(
          new detailRequest.paramType() as any,
          plainToInstance(detailRequest.paramType, detailRequest.data)
        )
      );
      if (validateRequest.length > 0) {
        validateRequest.forEach((error) =>
          errors.push(
            ...Object.values(
              error.constraints as {
                [type: string]: string;
              }
            )
          )
        );
      }
    }
    if (errors.length > 0) next(new BadRequestException(errors));
    next();
  };
};
