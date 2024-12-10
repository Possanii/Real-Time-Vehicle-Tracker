import {
  createParamDecorator,
  ExecutionContext,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Request } from 'express';
import { ZodSchema } from 'zod';

interface Schemas {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

export const ZodValidation = (schemas: Schemas) => {
  return createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    const { body, params, query } = request;

    if (schemas?.body && body) {
      const bodyResult = schemas.body.safeParse(body);

      if (!bodyResult.success) {
        throw new UnprocessableEntityException(
          `Body validation failed: ${JSON.stringify(bodyResult.error.flatten().fieldErrors)}`,
        );
      }

      return body;
    }

    if (schemas?.params && params) {
      const paramsResult = schemas.params.safeParse(params);

      if (!paramsResult.success) {
        throw new UnprocessableEntityException(
          `Params validation failed: ${JSON.stringify(paramsResult.error.flatten().fieldErrors)}`,
        );
      }

      return params;
    }

    if (schemas?.query && query) {
      const queryResult = schemas.query.safeParse(query);

      if (!queryResult.success) {
        throw new UnprocessableEntityException(
          `Query validation failed: ${JSON.stringify(queryResult.error.flatten().fieldErrors)}`,
        );
      }

      return query;
    }
  })();
};
