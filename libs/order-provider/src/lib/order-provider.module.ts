import { StockConsumerModule } from '@microservice-poc/stock-consumer';
import { Module } from '@nestjs/common';
import { OrderProviderController } from './order-provider.controller';
import { OrderProviderService } from './order-provider.service';

@Module({
  imports: [StockConsumerModule],
  controllers: [OrderProviderController],
  providers: [OrderProviderService],
  exports: [],
})
export class OrderProviderModule {}
