import { Module } from '@nestjs/common';
import { PlacesController } from './places/places.controller';
import { PlacesService } from './places/places.service';
import { GoogleMapsModule } from '@/google-maps/google-maps.module';
import { DirectionsController } from './directions/directions.controller';
import { DirectionsService } from './directions/directions.service';

@Module({
  imports: [GoogleMapsModule],
  controllers: [PlacesController, DirectionsController],
  providers: [PlacesService, DirectionsService],
})
export class MapsModule {}
