import {
  ORDER_PACKAGE_NAME,
  USER_PACKAGE_NAME,
} from '@microservice-poc/entities';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { OrderConsumerService } from './order-consumer.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDER_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: ['order'],
          url: process.env['ORDER_URL'] || 'localhost:3001',
          protoPath: [
            join(__dirname, '../../proto/order/order.proto'),
            join(__dirname, '../../proto/common.proto'),
          ],
        },
      },
      {
        name: USER_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: ['user'],
          url: process.env['USER_URL'] || 'localhost:3001',
          protoPath: [
            join(__dirname, '../../proto/order/user.proto'),
            join(__dirname, '../../proto/common.proto'),
          ],
        },
      },
    ]),
  ],
  controllers: [],
  providers: [OrderConsumerService],
  exports: [OrderConsumerService],
})
export class OrderConsumerModule {}
