import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { ICreateRoute, createRouteBodySchame } from './dto/create-route.dto';
import { ZodValidation } from '@/decorators/zod-validation.decorator';
import {
  getRouteByIdParamsSchame,
  IGetRouteById,
} from './dto/get-route-by-id.dto';

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
  getAll() {
    return this.routesService.findAll();
  }

  @Get(':id')
  getOne(
    @ZodValidation({ params: getRouteByIdParamsSchame })
    @Param('id')
    { id }: IGetRouteById,
  ) {
    return this.routesService.findOne(id);
  }
}
