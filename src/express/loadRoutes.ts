import { ClassConstructor } from "class-transformer";
import {
  MetadataKeysAuth,
  MetadataKeysMethods,
  MetadataKeysParameters,
  MetadataKeysRequests,
} from "../decorators/common";
import { MetadataKeysApplication } from "../decorators/common/main.keys";
import { Express, NextFunction } from "express";
import { ControllerType } from "../decorators/types/controller.type";
import { RouteTypes } from "../decorators/types/routes.type";
import logger from "../logger";
import { MethodsHttp } from "../common";
import { ValidationPipe } from "./validationPipe";
import { Request, Response } from "express";
import { getDecoratorsRequest } from "./getArgsRequest";
import { errorHandler } from "./errors/handler";

export class ConfigRoutes {
  private app: ClassConstructor<unknown>;
  private appExpress: Express;
  private primaryClass!: { controllers: Array<ClassConstructor<unknown>> };
  private prefix: string;

  constructor(
    classControllers: ClassConstructor<unknown>,
    appExpress: Express,
    prefix: string
  ) {
    this.app = classControllers;
    this.appExpress = appExpress;
    this.prefix = prefix;
  }

  public loadRoutes(): void {
    this.initializeControllers();
  }

  private initializeControllers(): void {
    this.primaryClass = Reflect.getMetadata(
      MetadataKeysApplication.GET_ALL_CONTROLLERS,
      this.app
    );

    if (!this.primaryClass) throw new Error("Not initialized application");
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.primaryClass.controllers.forEach((controller) => {
      const routes: Array<RouteTypes> = this.getRoutes(controller);
      const routeController: ControllerType = Reflect.getMetadata(
        MetadataKeysRequests.CONTROLLERS,
        controller
      );

      const pathController = this.generatePath(routeController);

      routes.forEach((route: RouteTypes) => {
        const { method, route: path, handler } = route;
        const middlewares = this.getMiddlewares(controller, handler);
        logger.info(
          `Register route ${method.toUpperCase()} ${pathController}/${path}`
        );

        this.appExpress[method as MethodsHttp](
          `/${pathController}/${path}`,
          ValidationPipe(controller, handler),
          (req: Request, res: Response) => {
            const args = getDecoratorsRequest(controller, handler, req);
            const instance: any = new controller();
            const result = instance[handler](...args.minimal, req, res);
            if (result !== undefined && !res.headersSent) {
              res.send(result);
            }
          }
        );
      });
    });
  }

  private generatePath(options: ControllerType): string {
    if (typeof options == "string") return `${this.prefix}/${options}`;
    return `${this.prefix}${this.getVersion(options)}/${options.path}`;
  }

  private getVersion(options: ControllerType): string {
    if (typeof options == "string") return "";
    return `${options.version}`;
  }

  private getRoutes(controller: ClassConstructor<unknown>): Array<RouteTypes> {
    const routesGet =
      Reflect.getMetadata(MetadataKeysMethods.GET, controller) || [];
    const routesPost =
      Reflect.getMetadata(MetadataKeysMethods.POST, controller) || [];
    const routesPut =
      Reflect.getMetadata(MetadataKeysMethods.PUT, controller) || [];
    const routesDelete =
      Reflect.getMetadata(MetadataKeysMethods.DELETE, controller) || [];

    return [...routesGet, ...routesPost, ...routesPut, ...routesDelete];
  }

  private getMiddlewares(
    controller: ClassConstructor<unknown>,
    handler: string
  ): Array<unknown> {
    const middlewares = (
      (Reflect.getMetadata(MetadataKeysAuth.AUTHENTICATION, controller) ||
        []) as Array<{ roles: Array<string>; handler: string }>
    ).filter((p) => p.handler == handler);
    console.log(middlewares);
    return [];
  }
}
