import { Injectable } from '@nestjs/common';
import { ICreateRoute } from './dto/create-route.dto';
import { PrismaService } from '@/database/prisma/prisma.service';
import { DirectionsService } from '@/maps/directions/directions.service';

@Injectable()
export class RoutesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly directionsService: DirectionsService,
  ) {}

  async create(createRoute: ICreateRoute) {
    const { available_travel_modes, geocoded_waypoints, routes, request } =
      await this.directionsService.findDiractions({
        originId: createRoute.origin_id,
        destinationId: createRoute.destination_id,
      });

    const legs = routes[0].legs[0];
    return this.prismaService.route.create({
      data: {
        name: createRoute.name,
        source: {
          name: legs.start_address,
          location: {
            lat: legs.start_location.lat,
            lng: legs.start_location.lng,
          },
        },
        destination: {
          name: legs.end_address,
          location: {
            lat: legs.end_location.lat,
            lng: legs.end_location.lng,
          },
        },
        duration: legs.duration.value,
        distance: legs.distance.value,
        directions: JSON.parse(
          JSON.stringify({
            available_travel_modes,
            geocoded_waypoints,
            routes,
            request,
          }),
        ),
      },
    });
  }

  findAll() {
    return this.prismaService.route.findMany();
  }
}
