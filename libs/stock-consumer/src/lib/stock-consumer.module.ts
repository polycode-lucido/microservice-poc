import { STOCK_PACKAGE_NAME } from '@microservice-poc/entities';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { StockConsumerService } from './stock-consumer.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: STOCK_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: ['stock'],
          url: process.env['STOCK_URL'] || 'localhost:3000',
          protoPath: [
            join(__dirname, '../../proto/stock/stock.proto'),
            join(__dirname, '../../proto/common.proto'),
          ],
        },
      },
    ]),
  ],
  controllers: [],
  providers: [StockConsumerService],
  exports: [StockConsumerService],
})
export class StockConsumerModule {}
