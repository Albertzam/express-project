import { ParameterDecorator } from "./types/parameter.type";

export const Res = (): ParameterDecorator => {
  return (target: any, key: string | symbol, index: number) => {
    Reflect.defineMetadata("Decorator:Res", index, target, key);
  };
};
