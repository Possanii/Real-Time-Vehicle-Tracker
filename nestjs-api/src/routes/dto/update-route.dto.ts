import { z } from 'zod';
import { createRouteBodySchame } from './create-route.dto';

export const updateRouteBodySchame = createRouteBodySchame
  .extend({
    freight: z.coerce.number(),
  })
  .optional();

export type IUpdateRoute = z.infer<typeof updateRouteBodySchame>;
