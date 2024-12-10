import { z } from 'zod';

export const getRouteByIdParamsSchame = z.object({
  id: z.string().length(24),
});

export type IGetRouteById = z.infer<typeof getRouteByIdParamsSchame>;
