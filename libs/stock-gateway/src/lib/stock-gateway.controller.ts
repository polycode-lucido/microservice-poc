import { Product } from '@microservice-poc/entities';
import { AppBaseErrorToHttpFilter } from '@microservice-poc/error';
import {
  StockConsumerModule,
  StockConsumerService,
} from '@microservice-poc/stock-consumer';
import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common';

@UseFilters(AppBaseErrorToHttpFilter)
@Controller()
export class StockGatewayController {
  constructor(private readonly stockConsumerService: StockConsumerService) {}

  @Get('/inventory')
  getInventory() {
    return this.stockConsumerService.getInventory();
  }

  @Get('/stock/:name')
  getStock(@Param('name') name: string) {
    return this.stockConsumerService.getStock(name);
  }

  @Get('/product/:name')
  getProduct(@Param('name') name: string) {
    return this.stockConsumerService.getProduct(name);
  }

  @Post('/stock/:name/:quantity')
  addStock(@Param('name') name: string, @Param('quantity') quantity: number) {
    return this.stockConsumerService.addStock(name, quantity);
  }

  @Post('/product/')
  addProduct(@Body() product: Product) {
    return this.stockConsumerService.addProduct(product);
  }
}

export const consumers = [StockConsumerModule];
