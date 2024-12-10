import { Injectable } from '@nestjs/common';
import { IGetDirectionsQuery } from './directions.controller';
import { GoogleMapsService } from '@/google-maps/google-maps-service/google-maps.service';
import { ConfigService } from '@nestjs/config';
import {
  DirectionsRequest,
  TravelMode,
} from '@googlemaps/google-maps-services-js';

@Injectable()
export class DirectionsService {
  constructor(
    private readonly googleMapsClient: GoogleMapsService,
    private readonly configService: ConfigService,
  ) {}

  async findDiractions({ originId, destinationId }: IGetDirectionsQuery) {
    const requestParams: DirectionsRequest['params'] = {
      origin: `place_id:${originId}`,
      destination: `place_id:${destinationId}`,
      mode: TravelMode.driving,
      key: this.configService.get('GOOGLE_MAPS_API_KEY'),
    };

    const { data } = await this.googleMapsClient.directions({
      params: requestParams,
    });

    return {
      ...data,
      request: {
        origin: {
          place_id: requestParams.origin,
          location: {
            lat: data.routes[0].legs[0].start_location.lat,
            lng: data.routes[0].legs[0].start_location.lng,
          },
        },
        destination: {
          place_id: requestParams.destination,
          location: {
            lat: data.routes[0].legs[0].end_location.lat,
            lng: data.routes[0].legs[0].end_location.lng,
          },
        },
        mode: requestParams.mode,
      },
    };
  }
}
