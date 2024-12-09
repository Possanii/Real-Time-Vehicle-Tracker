import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Client as GoogleMapsClient } from '@googlemaps/google-maps-services-js';

@Injectable()
export class GoogleMapsService
  extends GoogleMapsClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  onModuleInit() {
    console.log('GoogleMapsService initialized');
  }

  onModuleDestroy() {
    console.log('GoogleMapsService destroyed');
  }
}
