import { Module } from '@nestjs/common';
import { MapsModule } from './maps/maps.module';
import { GoogleMapsModule } from './google-maps/google-maps.module';
import { ConfigModule } from '@nestjs/config';
import { RoutesModule } from './routes/routes.module';
import { DatabaseModule } from './database/database.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MapsModule,
    GoogleMapsModule,
    RoutesModule,
    DatabaseModule,
    KafkaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
