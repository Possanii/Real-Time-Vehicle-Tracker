import { Module } from '@nestjs/common';
import { MapsModule } from './maps/maps.module';
import { GoogleMapsModule } from './google-maps/google-maps.module';

@Module({
  imports: [MapsModule, GoogleMapsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
