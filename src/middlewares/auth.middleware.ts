import { Middleware } from "../decorators/middleware.decorator";
import { Request, Response, NextFunction } from "express";
import { IMiddlewareExpress } from "../express/common/interfaces/middleware.interface";
import { UserService } from "../services/user.service";
import { BadRequestException } from "../express/errors/badRequest";

@Middleware()
export class AuthMiddleware implements IMiddlewareExpress {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log(await this.userService.getUser());
    next(new BadRequestException("unauthorized"));
  }
}
