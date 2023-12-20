import { ClassConstructor } from "class-transformer";
import { MetadataKeysApplication } from "./common/metadataApplication.keys";
import { Lifetime } from "awilix";

export const Middleware = () => {
  return (target: ClassConstructor<unknown>) => {
    Reflect.defineMetadata(
      MetadataKeysApplication.MIDDLEWARES,
      {
        name: target.name,
        handler: "use",
        scope: Lifetime.TRANSIENT,
      },
      target
    );
  };
};
