import { MetadataKeysParameters } from "./common";
import { ParameterDecorator } from "./types/parameter.type";

export const Body = (paramName?: string): ParameterDecorator => {
  return (target: any, key: string | symbol, index: number) => {
    const types = Reflect.getMetadata("design:paramtypes", target, key) || [];
    const paramType = types[index];
    Reflect.defineMetadata(
      MetadataKeysParameters.BODY,
      { paramIndex: index, paramName, paramType },
      target,
      key
    );
  };
};
