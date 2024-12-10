import { Controller, Get, Query } from '@nestjs/common';
import { PlacesService } from './places.service';
import { z } from 'zod';
import { ZodValidation } from '@/decorators/zod-validation.decorator';

const getPlacesQuerySchema = z.object({
  text: z.string().min(1),
});

type IGetPlacesQuery = z.infer<typeof getPlacesQuerySchema>;

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  getPlaces(
    @ZodValidation({ query: getPlacesQuerySchema })
    @Query('text')
    { text }: IGetPlacesQuery,
  ) {
    return this.placesService.findPlaces(text);
  }
}
