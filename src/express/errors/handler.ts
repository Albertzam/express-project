import { Request, Response, NextFunction } from "express";
import { BadRequestException } from "./badRequest";

export const errorHandler = (
  err: Error | BadRequestException,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BadRequestException) {
    return res.status(err.code).json({ error: err.message, code: err.code });
  }
  next(err);
};
