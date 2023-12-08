import { ClassConstructor } from "class-transformer";
import { MetadataKeysApplication } from "./common/main.keys";

export const Middleware = () => {
  return (target: ClassConstructor<unknown>) => {
    Reflect.defineMetadata(
      MetadataKeysApplication.MIDDLEWARES,
      { name: target.name, handler: "use" },
      target
    );
  };
};
