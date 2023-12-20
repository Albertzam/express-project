import { ClassConstructor } from "class-transformer";
import { MetadataKeysApplication } from "./common/metadataApplication.keys";

export const UseMiddleware = (
  ...middlewares: Array<ClassConstructor<unknown>>
) => {
  return (
    target: Object,
    propertyKey: string | symbol,
    _: PropertyDescriptor
  ) => {
    const controller = target.constructor;
    Reflect.defineMetadata(
      MetadataKeysApplication.USE_MIDDLEWARE,
      middlewares,
      controller,
      propertyKey
    );
  };
};
