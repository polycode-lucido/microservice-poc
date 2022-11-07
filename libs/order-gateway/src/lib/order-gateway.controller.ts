import { Order, User } from '@microservice-poc/entities';
import { AppBaseErrorToHttpFilter } from '@microservice-poc/error';
import {
  OrderConsumerModule,
  OrderConsumerService,
} from '@microservice-poc/order-consumer';
import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';

@UseFilters(AppBaseErrorToHttpFilter)
@Controller()
export class OrderGatewayController {
  constructor(private readonly orderConsumerService: OrderConsumerService) {}

  @Get('/user')
  getUsers() {
    return this.orderConsumerService.getUsers();
  }

  @Get('/order')
  getOrders() {
    return this.orderConsumerService.getOrders();
  }

  @Post('/order')
  async createOrder(@Body() order: Order) {
    return await this.orderConsumerService.createOrder(order);
  }

  @Post('/user')
  createUser(@Body() user: User) {
    return this.orderConsumerService.createUser(user);
  }
}

export const consumers = [OrderConsumerModule];
