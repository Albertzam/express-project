import { ParameterDecorator } from "./types/parameter.type";

export const Req = (): ParameterDecorator => {
  return (target: any, key: string | symbol, index: number) => {
    Reflect.defineMetadata("Decorator:Req", index, target, key);
  };
};
