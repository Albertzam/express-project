import { MethodsHttp } from "../common";
import { MetadataKeysMethods } from "./common";

export const Get = (route: string) => {
  return (
    target: Object,
    propertyKey: string | symbol,
    _: PropertyDescriptor
  ) => {
    const controller = target.constructor;
    const routes: Array<unknown> =
      Reflect.getMetadata(MetadataKeysMethods.GET, controller) || [];

    routes.push({ method: MethodsHttp.GET, route, handler: propertyKey });
    Reflect.defineMetadata(MetadataKeysMethods.GET, routes, controller);
  };
};
