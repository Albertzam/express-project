import { Middleware } from "../decorators/middleware.decorator";
import { Request, Response, NextFunction } from "express";
import { IMiddlewareExpress } from "../express/common/middlewares.express";

@Middleware()
export class AuthMiddleware implements IMiddlewareExpress {
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log("entry middleware");

    next();
  }
}
