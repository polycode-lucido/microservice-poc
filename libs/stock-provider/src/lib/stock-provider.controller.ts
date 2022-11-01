import { Controller, Get, Param } from '@nestjs/common';
import { StockProviderService } from './stock-provider.service';

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
}
