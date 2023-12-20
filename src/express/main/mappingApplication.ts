import { ClassConstructor, instanceToPlain } from "class-transformer";
import { LoggerExpress } from "./singleton/logger.singleton";
import { MetadataKeysApplication } from "../../decorators/common/metadataApplication.keys";
import { ContainerModule } from "./containerModule";
import { MetadataKeysMethods } from "../../decorators/common";
import {
  ControllerOption,
  ControllerType,
} from "../../decorators/types/controller.type";
import { RouteTypes } from "../../decorators/types/routes.type";
import { ExpressService } from "./singleton/express.singleton";
import { HttpStatus, MethodsHttp } from "../../common";
import { ValidationPipe } from "./common/pipes/validationPipe";
import { getDecoratorsRequest } from "./common/getArgsRequest";
import { NextFunction, Request, Response } from "express";
import { IAnyClass } from "../common";

export class MappingApplication {
  private container: ContainerModule;

  constructor(
    private readonly loggerExpress: LoggerExpress,
    private readonly expressService: ExpressService
  ) {
    this.container = new ContainerModule();
  }

  public initializeMappingInController(
    initialClass: ClassConstructor<unknown>
  ): void {
    const module: {
      controllers: Array<ClassConstructor<unknown>>;
      providers: Array<ClassConstructor<unknown>>;
    } = Reflect.getMetadata(MetadataKeysApplication.MODULE, initialClass) || {
      controllers: [],
      providers: [],
    };

    this.container.registerClassDependencies(
      module.providers,
      MetadataKeysApplication.PROVIDERS
    );

    this.container.registerClassDependencies(
      module.controllers,
      MetadataKeysApplication.CONTROLLERS
    );

    this.mappingControllers(module.controllers);
  }

  private mappingControllers(
    controllers: Array<ClassConstructor<unknown>>
  ): void {
    controllers.forEach(
      (controller: ClassConstructor<unknown> & { [key: string]: any }) => {
        const functionsInController = this.getRoutes(controller);
        const initTime = new Date();
        const configController: ControllerType = Reflect.getMetadata(
          MetadataKeysApplication.CONTROLLERS,
          controller
        );

        const pathController = this.generatePath(configController);

        this.loggerExpress.log(
          "RoutesResolver",
          `Mapping controller ${controller.name}`,
          new Date().getTime() - initTime.getTime()
        );

        functionsInController.forEach(async (route: RouteTypes) => {
          const { method, route: path, handler } = route;
          const initTime = new Date();
          const middlewares = this.getMiddlewares(controller, handler);

          this.expressService
            .getServer()
            [method as MethodsHttp](
              `/${pathController}/${path}`,
              ValidationPipe(controller, handler),
              ...middlewares,
              async (req: Request, res: Response) => {
                const args = getDecoratorsRequest(controller, handler, req);

                const instance = this.container.resolve<typeof controller>(
                  (configController as ControllerOption).name as string
                );

                let result = await instance[handler](...args.minimal, req, res);
                if (!res.headersSent) {
                  result !== undefined
                    ? res.send(instanceToPlain(result))
                    : res.sendStatus(HttpStatus.NO_CONTENT);
                }
              }
            );

          this.loggerExpress.log(
            "RouterExplorer",
            `Mapped Route /${pathController}/${path}`,
            new Date().getTime() - initTime.getTime()
          );
        });

        // console.log(this.container.printTotalDependencies());
      }
    );
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

  private generatePath(options: ControllerType): string {
    if (typeof options !== "string") return `api/${options.path}`;

    return "";
  }

  private getVersion(options?: string): string {
    if (options) return options;

    return "";
  }

  private getMiddlewares(
    anyClass: ClassConstructor<unknown>,
    handler: string
  ): Array<(req: Request, res: Response, next: NextFunction) => Promise<void>> {
    const middlewares: Array<IAnyClass> =
      Reflect.getMetadata(
        MetadataKeysApplication.USE_MIDDLEWARE,
        anyClass,
        handler
      ) || [];

    this.registerMiddlewaresInContainer(middlewares);
    const instances = this.createInstanceMiddlewares(middlewares);
    return instances;
  }

  private createInstanceMiddlewares(
    middlewares: Array<IAnyClass>
  ): Array<(req: Request, res: Response, next: NextFunction) => Promise<void>> {
    return middlewares.map((middleware) => {
      const instance = this.container.resolve<typeof middleware>(
        middleware.name
      );

      if (!instance["use"])
        throw new Error(
          `The Middleware ${middleware.name} not implement interface IMiddlewareExpress`
        );

      return async (req: Request, res: Response, next: NextFunction) =>
        instance["use"](req, res, next);
    });
  }

  private registerMiddlewaresInContainer(
    middlewares: Array<ClassConstructor<unknown>>
  ): void {
    this.container.registerClassDependencies(
      middlewares,
      MetadataKeysApplication.MIDDLEWARES
    );
  }
}
