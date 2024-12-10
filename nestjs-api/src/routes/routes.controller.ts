import { Controller, Body, Get } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { GetRouteDto } from './dto/get-route.dto';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Get()
  create(@Body() getRouteDto: GetRouteDto) {
    return this.routesService.get(getRouteDto);
  }
}
