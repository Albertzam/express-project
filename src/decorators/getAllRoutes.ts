import { MetadataKeysApplication } from "./common/main.keys";
import { ClassDecorator } from "./types/controller.type";

export const GetAllControllers = (options: {
  controllers?: Array<any>;
}): ClassDecorator => {
  return (target: Function) => {
    Reflect.defineMetadata(
      MetadataKeysApplication.GET_ALL_CONTROLLERS,
      options,
      target
    );
  };
};
