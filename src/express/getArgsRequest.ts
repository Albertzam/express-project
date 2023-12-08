import { ClassConstructor } from "class-transformer";
import { MetadataKeysParameters } from "../decorators/common";
import { Request } from "express";

export const getDecoratorsRequest = (
  controller: ClassConstructor<unknown>,
  handler: string,
  req: Request
): {
  detail: Array<{
    paramIndex: number;
    paramName: string;
    paramType: ClassConstructor<unknown>;
    data?: unknown;
  }>;
  minimal: Array<unknown>;
} => {
  let args: {
    detail: Array<{
      paramIndex: number;
      paramName: string;
      paramType: ClassConstructor<unknown>;
      data?: unknown;
    }>;
    minimal: Array<unknown>;
  } = { detail: [], minimal: [] };

  const body = Reflect.getMetadata(
    MetadataKeysParameters.BODY,
    controller.prototype,
    handler
  );

  const params = Reflect.getMetadata(
    MetadataKeysParameters.PARAMS,
    controller.prototype,
    handler
  );

  const query = Reflect.getMetadata(
    MetadataKeysParameters.QUERY,
    controller.prototype,
    handler
  );

  if (body !== undefined) {
    args.minimal[body.paramIndex] = req.body;
    args.detail.push({ ...body, data: req.body });
  }

  if (params !== undefined) {
    args.minimal[params.paramIndex] = req.params;
    args.detail.push({ ...params, data: req.params });
  }

  if (query !== undefined) {
    args.minimal[query.paramIndex] = req.query;
    args.detail.push({ ...query, data: req.query });
  }
  return args;
};

const requestTypeData = {
  BODY: "body",
  PARAMS: "params",
  QUERY: "query",
};
