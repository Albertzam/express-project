import { ClassConstructor } from "class-transformer";

export interface IArgsRequest {
  detail: Array<{
    paramIndex: number;
    paramName: string;
    paramType: ClassConstructor<unknown>;
    data?: unknown;
  }>;
  minimal: Array<unknown>;
}
