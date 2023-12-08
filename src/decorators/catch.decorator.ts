import { ClassConstructor } from "class-transformer";
import { MetadataKeysApplication } from "./common/main.keys";

export const Catch = () => {
  return (target: ClassConstructor<unknown>) => {
    Reflect.defineMetadata(
      MetadataKeysApplication.CATCH,
      { name: target.name, handler: "canActivate" },
      target
    );
  };
};
