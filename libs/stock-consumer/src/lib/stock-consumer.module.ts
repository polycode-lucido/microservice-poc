import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { StockConsumerService } from './stock-consumer.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [StockConsumerService],
  exports: [StockConsumerService],
})
export class StockConsumerModule {}
