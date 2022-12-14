import { Module } from '@nestjs/common';
import { StockProviderController } from './stock-provider.controller';
import { StockProviderService } from './stock-provider.service';

@Module({
  controllers: [StockProviderController],
  providers: [StockProviderService],
  exports: [],
})
export class StockProviderModule {}
