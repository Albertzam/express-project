import { ClassConstructor } from "class-transformer";
import { MetadataKeysApplication } from "./common/metadataApplication.keys";

export const Catch = () => {
  return (target: ClassConstructor<unknown>) => {
    Reflect.defineMetadata(
      MetadataKeysApplication.CATCH,
      { name: target.name, handler: "canActivate" },
      target
    );
  };
};
