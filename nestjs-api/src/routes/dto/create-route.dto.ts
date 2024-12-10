import { z } from 'zod';

export const createRouteBodySchame = z.object({
  name: z.string(),
  origin_id: z.string(),
  destination_id: z.string(),
});

export type ICreateRoute = z.infer<typeof createRouteBodySchame>;
