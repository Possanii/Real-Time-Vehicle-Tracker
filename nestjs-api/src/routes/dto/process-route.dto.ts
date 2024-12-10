import { z } from 'zod';

export const processRouteBodySchame = z.object({
  route_id: z.string().length(24),
  lat: z.number(),
  lng: z.number(),
});

export type IProcessRoute = z.infer<typeof processRouteBodySchame>;
