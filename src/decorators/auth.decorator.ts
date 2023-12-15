import { MetadataKeysAuth } from "./common";

export const Auth = (props?: { roles: Array<string> }) => {
  return (
    target: Object,
    propertyKey: string | symbol,
    _: PropertyDescriptor
  ) => {
    const controller = target.constructor;
    const auth: Array<unknown> =
      Reflect.getMetadata(MetadataKeysAuth.AUTHENTICATION, controller) || [];
    auth.push({
      roles: props?.roles,
      middleware: "auth",
      handler: propertyKey,
    });
    Reflect.defineMetadata(MetadataKeysAuth.AUTHENTICATION, auth, controller);
  };
};
