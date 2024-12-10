import { ZodValidation } from '@/decorators/zod-validation.decorator';
import { Controller, Get, Query } from '@nestjs/common';
import { z } from 'zod';
import { DirectionsService } from './directions.service';

export const getDirectionsQuerySchema = z.object({
  originId: z.string(),
  destinationId: z.string(),
});

export type IGetDirectionsQuery = z.infer<typeof getDirectionsQuerySchema>;

@Controller('directions')
export class DirectionsController {
  constructor(private readonly directionsService: DirectionsService) {}

  @Get()
  getDirections(
    @ZodValidation({ query: getDirectionsQuerySchema })
    @Query()
    { originId, destinationId }: IGetDirectionsQuery,
  ) {
    return this.directionsService.findDiractions({ originId, destinationId });
  }
}
