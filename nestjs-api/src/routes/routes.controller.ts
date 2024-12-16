import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { ICreateRoute, createRouteBodySchame } from './dto/create-route.dto';
import { ZodValidation } from '@/decorators/zod-validation.decorator';
import {
  getRouteByIdParamsSchame,
  IGetRouteById,
} from './dto/get-route-by-id.dto';
import {
  emitNewPointRouteBodySchema,
  IEmitNewPointBody,
} from './dto/emit-new-point-route.dto';
import { RoutesDriverService } from './routes-driver/routes-driver.service';

@Controller('routes')
export class RoutesController {
  constructor(
    private readonly routesService: RoutesService,
    private routesDriverService: RoutesDriverService,
  ) {}

  @Post(':id/emit-new-points')
  emitNewPoints(
    @ZodValidation({ params: getRouteByIdParamsSchame })
    @Param('id')
    id: string,
    @ZodValidation({ params: emitNewPointRouteBodySchema })
    @Body()
    payload: IEmitNewPointBody,
  ) {
    return this.routesDriverService.processRoute({
      route_id: id,
      lat: payload.lat,
      lng: payload.lng,
    });
  }

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
