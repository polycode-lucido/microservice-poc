import {
  OrderGatewayController,
  consumers as orderConsumers,
} from '@microservice-poc/order-gateway';
import {
  StockGatewayController,
  consumers as stockConsumers,
} from '@microservice-poc/stock-gateway';
import { Module } from '@nestjs/common';

@Module({
  imports: [...orderConsumers, ...stockConsumers],
  controllers: [StockGatewayController, OrderGatewayController],
  providers: [],
})
export class AppModule {}
