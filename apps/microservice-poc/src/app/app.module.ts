import { StockProviderModule } from '@microservice-poc/stock-provider';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [StockProviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
