import { StockConsumerModule } from '@microservice-poc/stock-consumer';
import { Module } from '@nestjs/common';
import { OrderProviderController } from './order-provider.controller';
import { OrderProviderService } from './order-provider.service';
import { UserProviderController } from './user-provider.controller';

@Module({
  imports: [StockConsumerModule],
  controllers: [OrderProviderController, UserProviderController],
  providers: [OrderProviderService],
  exports: [],
})
export class OrderProviderModule {}
