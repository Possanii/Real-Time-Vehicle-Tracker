import { Injectable } from '@nestjs/common';
import {
  FindPlaceFromTextResponseData,
  PlaceInputType,
} from '@googlemaps/google-maps-services-js';
import { GoogleMapsService } from '@/google-maps/google-maps-service/google-maps.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlacesService {
  constructor(
    private readonly googleMapsClient: GoogleMapsService,
    private readonly configService: ConfigService,
  ) {}

  async findPlaces(text: string): Promise<FindPlaceFromTextResponseData> {
    const { data } = await this.googleMapsClient.findPlaceFromText({
      params: {
        input: text,
        inputtype: PlaceInputType.textQuery,
        fields: ['place_id', 'formatted_address', 'geometry', 'name'],
        key: this.configService.get('GOOGLE_MAPS_API_KEY'),
      },
    });

    return data;
  }
}
