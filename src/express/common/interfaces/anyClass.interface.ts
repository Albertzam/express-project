import { ClassConstructor } from "class-transformer";

export interface IAnyClass extends ClassConstructor<unknown> {
  [key: string]: any;
}
