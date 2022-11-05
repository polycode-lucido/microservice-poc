import { OrderProviderModule } from '@microservice-poc/order-provider';
import { Module } from '@nestjs/common';

@Module({
  imports: [OrderProviderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
