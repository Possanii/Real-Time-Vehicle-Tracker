import { Injectable } from '@nestjs/common';
import { IProcessRoute } from '../dto/process-route.dto';
import { PrismaService } from '@/database/prisma/prisma.service';

@Injectable()
export class RoutesDriverService {
  constructor(private readonly prismaService: PrismaService) {}

  processRoute({ route_id, lat, lng }: IProcessRoute) {
    return this.prismaService.routeDriver.upsert({
      include: {
        route: true,
      },
      where: {
        route_id,
      },
      create: {
        route_id,
        points: {
          set: {
            location: {
              lat,
              lng,
            },
          },
        },
      },
      update: {
        points: {
          push: {
            location: {
              lat,
              lng,
            },
          },
        },
      },
    });
  }
}
