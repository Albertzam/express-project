import { Request, Response, NextFunction } from "express";

export interface IMiddlewareExpress {
  use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
