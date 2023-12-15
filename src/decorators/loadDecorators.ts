import { Application } from "express";
import { ControllerType } from "./types/controller.type";
import { ClassConstructor } from "class-transformer";
import { RouteTypes } from "./types/routes.type";
import { MetadataKeysMethods, MetadataKeysParameters } from "./common";
import logger from "../logger";
import { MetadataKeysApplication } from "./common/metadataApplication.keys";

export const RegisterRoutes = <T = any>(app: Application) => {
  return function (target: ClassConstructor<T>) {
    const routes = Reflect.getMetadata(MetadataKeysMethods.GET, target) || [];
    const routeController = Reflect.getMetadata(
      MetadataKeysApplication.CONTROLLERS,
      target
    );

    const pathController = getPathController(routeController);

    routes.forEach((route: RouteTypes) => {
      const { method, route: path, handler } = route;
      const args: Array<unknown> = [];
      logger.info(`Register route GET ${pathController}/${path}`);
      app[method as "get"](`/${pathController}/${path}`, (req, res) => {
        const dataBody = Reflect.getMetadata(
          MetadataKeysParameters.BODY,
          target.prototype,
          handler
        );

        if (dataBody !== undefined) {
          args[dataBody.paramIndex] = req.body;
        }

        const instance: any = new target();
        const result = instance[handler](...args, req, res);
        if (result !== undefined && !res.headersSent) {
          res.send(result);
        }
      });
    });
  };
};

export const getPathController = (options: ControllerType): string => {
  if (typeof options === "string") return `api/${options}`;

  return options.version
    ? `api/${options.version}/${options.path}`
    : options.path;
};

export const extractBody = () => {
  Reflect;
  return;
};
