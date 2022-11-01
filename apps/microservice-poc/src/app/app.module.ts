import { StockProviderModule } from '@microservice-poc/stock-provider';
import { Module } from '@nestjs/common';
@Module({
  imports: [StockProviderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
