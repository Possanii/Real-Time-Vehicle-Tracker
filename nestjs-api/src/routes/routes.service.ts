import { Inject, Injectable } from '@nestjs/common';
import { ICreateRoute } from './dto/create-route.dto';
import { PrismaService } from '@/database/prisma/prisma.service';
import { DirectionsService } from '@/maps/directions/directions.service';
import * as kafkaLib from '@confluentinc/kafka-javascript';
import { IUpdateRoute } from './dto/update-route.dto';

@Injectable()
export class RoutesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly directionsService: DirectionsService,
    @Inject('KAFKA_PRODUCER')
    private readonly kafkaProducer: kafkaLib.KafkaJS.Producer,
  ) {}

  async create(createRoute: ICreateRoute) {
    const { available_travel_modes, geocoded_waypoints, routes, request } =
      await this.directionsService.findDiractions({
        originId: createRoute.origin_id,
        destinationId: createRoute.destination_id,
      });

    const legs = routes[0].legs[0];
    const route = await this.prismaService.route.create({
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

    this.kafkaProducer.send({
      topic: 'route',
      messages: [
        {
          value: JSON.stringify({
            event: 'RouteCreated',
            id: route.id,
            distance: legs.distance.value,
            directions: legs.steps.reduce((acc, step) => {
              acc.push({
                lat: step.start_location.lat,
                lng: step.start_location.lng,
              });

              acc.push({
                lat: step.end_location.lat,
                lng: step.end_location.lng,
              });

              return acc;
            }, []),
          }),
        },
      ],
    });

    return route;
  }

  findAll() {
    return this.prismaService.route.findMany();
  }

  findOne(id: string) {
    return this.prismaService.route.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: string, updateRouteDto: IUpdateRoute) {
    return this.prismaService.route.update({
      where: { id },
      data: updateRouteDto,
    });
  }
}
