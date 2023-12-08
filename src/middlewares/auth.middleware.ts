import { Middleware } from "../decorators/middleware.decorator";
import { Request, Response, NextFunction } from "express";
import { IMiddlewareExpress } from "../express/common/middlewares.express";

@Middleware()
export class AuthMiddleware implements IMiddlewareExpress {
  use(req: Request, res: Response, next: NextFunction): void {
    console.log("entry middleware");

    next();
  }
}
