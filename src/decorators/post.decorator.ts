import { MethodsHttp } from "../common";
import { MetadataKeysMethods } from "./common";

export const Post = (route: string) => {
  return (
    target: Object,
    propertyKey: string | symbol,
    _: PropertyDescriptor
  ) => {
    const controller = target.constructor;
    const routes: Array<unknown> =
      Reflect.getMetadata(MetadataKeysMethods.POST, controller) || [];

    routes.push({ method: MethodsHttp.POST, route, handler: propertyKey });
    Reflect.defineMetadata(MetadataKeysMethods.POST, routes, controller);
  };
};
