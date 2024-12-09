import { Injectable } from '@nestjs/common';
import {
  FindPlaceFromTextResponseData,
  PlaceInputType,
} from '@googlemaps/google-maps-services-js';
import { GoogleMapsService } from '@/google-maps/google-maps-service/google-maps.service';

@Injectable()
export class PlacesService {
  constructor(private readonly googleMapsClient: GoogleMapsService) {}

  async findPlaces(text: string): Promise<FindPlaceFromTextResponseData> {
    const { data } = await this.googleMapsClient.findPlaceFromText({
      params: {
        input: text,
        inputtype: PlaceInputType.textQuery,
        fields: ['place_id', 'formatted_address', 'geometry', 'name'],
        key: '123',
      },
    });

    return data;
  }
}
