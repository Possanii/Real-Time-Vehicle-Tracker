import { Injectable } from '@nestjs/common';
import { GetRouteDto } from './dto/get-route.dto';

@Injectable()
export class RoutesService {
  get(getRouteDto: GetRouteDto) {
    return 'This action get a route';
  }
}
