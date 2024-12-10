import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { DatabaseModule } from '@/database/database.module';
import { MapsModule } from '@/maps/maps.module';
import { RoutesDriverService } from './routes-driver/routes-driver.service';

@Module({
  imports: [DatabaseModule, MapsModule],
  controllers: [RoutesController],
  providers: [RoutesService, RoutesDriverService],
})
export class RoutesModule {}
