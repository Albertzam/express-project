import { MetadataKeysApplication } from "./common/metadataApplication.keys";
import { ClassDecorator } from "./types/controller.type";

export const Module = (options: {
  controllers?: Array<any>;
  providers?: Array<any>;
  imports?: Array<any>;
}): ClassDecorator => {
  return (target: Function) => {
    if (options.imports) console.log("OPTIONS >> ", options.imports);
    Reflect.defineMetadata(MetadataKeysApplication.MODULE, options, target);
  };
};
