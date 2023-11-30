import { MetadataKeysParameters } from "./common";
import { ParameterDecorator } from "./types/parameter.type";

export const Body = (paramName?: string): ParameterDecorator => {
  return (target: any, key: string | symbol, index: number) => {
    Reflect.defineMetadata(
      MetadataKeysParameters.BODY,
      { paramIndex: index, paramName },
      target,
      key
    );
  };
};
