import { ClassConstructor } from "class-transformer";

export type ControllerType = string | ControllerOption;

type ControllerOption = {
  path: string;
  version?: string;
  name?: string;
};

export type ClassDecorator = <TFunction extends Function>(
  target: TFunction
) => TFunction | void;
