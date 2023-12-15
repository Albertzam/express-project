import { Lifetime } from "awilix";
import { ControllerType, ClassDecorator } from "./types/controller.type";
import { toCamelCase } from "./common/toCamelCase";
import { MetadataKeysApplication } from "./common/metadataApplication.keys";

export const Controller = (options: ControllerType): ClassDecorator => {
  return (target: Function) => {
    let defaultOptions = {};

    if (typeof options == "string") {
      defaultOptions = { path: options, name: toCamelCase(target.name) };
    } else defaultOptions = { ...options };

    Reflect.defineMetadata(
      MetadataKeysApplication.CONTROLLERS,
      { scope: Lifetime.TRANSIENT, type: "controller", ...defaultOptions },
      target
    );
  };
};
