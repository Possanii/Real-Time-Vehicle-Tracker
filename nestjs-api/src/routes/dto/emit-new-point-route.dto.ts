import { z } from 'zod';

export const emitNewPointRouteBodySchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export type IEmitNewPointBody = z.infer<typeof emitNewPointRouteBodySchema>;
