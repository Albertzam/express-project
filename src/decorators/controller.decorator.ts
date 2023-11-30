import { MetadataKeysRequests } from "./common";
import { ControllerType, ClassDecorator } from "./types/controller.type";

export const Controller = (options: ControllerType): ClassDecorator => {
  return (target: Function) => {
    Reflect.defineMetadata(MetadataKeysRequests.CONTROLLERS, options, target);
  };
};
