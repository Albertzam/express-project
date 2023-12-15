import { AwilixContainer, InjectionMode, createContainer } from "awilix";

let container: AwilixContainer;

export const getContainer = () => {
  if (!container)
    container = createContainer({ injectionMode: InjectionMode.CLASSIC });
  return container;
};
