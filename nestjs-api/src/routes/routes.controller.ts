import { Controller, Body, Post, Get } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { ICreateRoute, createRouteBodySchame } from './dto/create-route.dto';
import { ZodValidation } from '@/decorators/zod-validation.decorator';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  create(
    @ZodValidation({ body: createRouteBodySchame })
    @Body()
    createRoute: ICreateRoute,
  ) {
    return this.routesService.create(createRoute);
  }

  @Get()
  findAll() {
    return this.routesService.findAll();
  }
}
