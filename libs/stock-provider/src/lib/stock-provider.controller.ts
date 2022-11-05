import { Product } from '@microservice-poc/entities';
import { AppBaseErrorToHttpFilter } from '@microservice-poc/error';
import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common';
import { StockProviderService } from './stock-provider.service';

@UseFilters(AppBaseErrorToHttpFilter)
@Controller()
export class StockProviderController {
  constructor(private readonly stockProviderService: StockProviderService) {}

  @Get('/inventory')
  getInventory() {
    return this.stockProviderService.getInventory();
  }

  @Get('/stock/:name')
  getStock(@Param('name') name: string) {
    return this.stockProviderService.getStock(name);
  }

  @Get('/product/:name')
  getProduct(@Param('name') name: string) {
    return this.stockProviderService.getProduct(name);
  }

  @Post('/stock/:name/:quantity')
  addStock(@Param('name') name: string, @Param('quantity') quantity: number) {
    return this.stockProviderService.addStock(name, quantity);
  }

  @Post('/product/')
  addProduct(@Body() product: Product) {
    return this.stockProviderService.addProduct(product);
  }
}
