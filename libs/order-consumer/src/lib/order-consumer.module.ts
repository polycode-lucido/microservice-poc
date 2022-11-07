import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OrderConsumerService } from './order-consumer.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [OrderConsumerService],
  exports: [OrderConsumerService],
})
export class OrderConsumerModule {}
