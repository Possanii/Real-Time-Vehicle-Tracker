import { Injectable } from '@nestjs/common';
import { GetRouteDto } from './dto/get-route.dto';
import { PrismaService } from '@/database/prisma/prisma.service';

@Injectable()
export class RoutesService {
  constructor(private readonly prismaService: PrismaService) {}

  get(getRouteDto: GetRouteDto) {
    return 'This action get a route';
  }
}
