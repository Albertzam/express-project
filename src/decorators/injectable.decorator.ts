import { Lifetime, LifetimeType } from "awilix";
import { toCamelCase } from "./common/toCamelCase";
import { MetadataKeysApplication } from "./common/metadataApplication.keys";

export const Injectable = (props?: { scope?: LifetimeType; name?: string }) => {
  return (target: Function) => {
    props = props || {};
    const scope = props.scope || Lifetime.TRANSIENT;
    const name = props.name || toCamelCase(target.name);
    const type = "provider";
    Reflect.defineMetadata(
      MetadataKeysApplication.PROVIDERS,
      { scope, name, type },
      target
    );
  };
};
