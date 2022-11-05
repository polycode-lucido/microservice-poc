import { Order, User } from '@microservice-poc/entities';
import { AppBaseErrorToHttpFilter } from '@microservice-poc/error';
import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { OrderProviderService } from './order-provider.service';

@UseFilters(AppBaseErrorToHttpFilter)
@Controller()
export class OrderProviderController {
  constructor(private readonly orderProviderService: OrderProviderService) {}

  @Get('/user')
  getUsers() {
    return this.orderProviderService.getUsers();
  }

  @Get('/order')
  getOrders() {
    return this.orderProviderService.getOrders();
  }

  @Post('/order')
  async createOrder(@Body() order: Order) {
    return await this.orderProviderService.createOrder(order);
  }

  @Post('/user')
  createUser(@Body() user: User) {
    return this.orderProviderService.createUser(user);
  }
}
