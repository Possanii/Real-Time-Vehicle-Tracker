import { Module } from '@nestjs/common';
import { PlacesController } from './places/places.controller';
import { PlacesService } from './places/places.service';
import { GoogleMapsModule } from '@/google-maps/google-maps.module';

@Module({
  imports: [GoogleMapsModule],
  controllers: [PlacesController],
  providers: [PlacesService],
})
export class MapsModule {}
