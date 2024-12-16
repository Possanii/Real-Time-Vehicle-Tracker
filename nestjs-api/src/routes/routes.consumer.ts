import { KafkaContext } from '@/kafka/kafka-context';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RoutesService } from './routes.service';

@Controller()
export class RoutesConsumer {
  constructor(private routesService: RoutesService) {}

  @MessagePattern('freight')
  async updateFreight(payload: KafkaContext) {
    await this.routesService.update(payload.messageValue.route_id, {
      freight: payload.messageValue.amount,
    });
  }
}
