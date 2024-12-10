import { Module } from '@nestjs/common';
import { MapsModule } from './maps/maps.module';
import { GoogleMapsModule } from './google-maps/google-maps.module';
import { ConfigModule } from '@nestjs/config';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MapsModule,
    GoogleMapsModule,
    RoutesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
