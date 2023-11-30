export type ControllerType = string | ControllerOption;

type ControllerOption = {
  path: string;
  version?: string;
};

export type ClassDecorator = <TFunction extends Function>(
  target: TFunction
) => TFunction | void;
