import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { DatabaseModule } from '@/database/database.module';
import { MapsModule } from '@/maps/maps.module';
import { RoutesDriverService } from './routes-driver/routes-driver.service';
import { RoutesDriverGateway } from './routes-driver/routes-driver.gateway';
import { KafkaModule } from '@/kafka/kafka.module';
import { RoutesConsumer } from './routes.consumer';

@Module({
  imports: [DatabaseModule, MapsModule, KafkaModule],
  controllers: [RoutesController, RoutesConsumer],
  providers: [RoutesService, RoutesDriverService, RoutesDriverGateway],
})
export class RoutesModule {}
