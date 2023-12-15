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
    const mid: Array<unknown> =
      Reflect.getMetadata(MetadataKeysApplication.MIDDLEWARES, controller) ||
      [];

    mid.push({ middlewares, handler: propertyKey });
    Reflect.defineMetadata(
      MetadataKeysApplication.MIDDLEWARES,
      mid,
      controller
    );
  };
};
