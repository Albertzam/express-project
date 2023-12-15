import { MetadataKeysApplication } from "./common/metadataApplication.keys";
import { ClassDecorator } from "./types/controller.type";

export const Module = (options: {
  controllers?: Array<any>;
  providers?: Array<any>;
}): ClassDecorator => {
  return (target: Function) => {
    Reflect.defineMetadata(MetadataKeysApplication.MODULE, options, target);
  };
};
