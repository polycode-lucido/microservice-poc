import {
  Order,
  OrderServiceClient,
  ORDER_PACKAGE_NAME,
  ORDER_SERVICE_NAME,
  User,
  UserServiceClient,
  USER_PACKAGE_NAME,
  USER_SERVICE_NAME,
} from '@microservice-poc/entities';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable()
export class OrderConsumerService implements OnModuleInit {
  private orderService: OrderServiceClient;
  private userService: UserServiceClient;

  constructor(
    @Inject(ORDER_PACKAGE_NAME) private orderClient: ClientGrpc,
    @Inject(USER_PACKAGE_NAME) private userClient: ClientGrpc
  ) {}

  onModuleInit(): void {
    this.orderService =
      this.orderClient.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
    this.userService =
      this.userClient.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async getUsers(): Promise<User[]> {
    const request = this.userService.getUsers({});

    const { users } = await firstValueFrom(request);
    return users;
  }

  async getOrders(): Promise<Order[]> {
    const request = this.orderService.getOrders({});

    const { orders } = await firstValueFrom(request);

    return orders
      ? orders.map((order) => ({
          ...order,
          date: order.date ? order.date : new Date().toISOString(),
        }))
      : [];
  }

  async createUser(user: User): Promise<User> {
    return await firstValueFrom(this.userService.createUser(user));
  }

  async createOrder(order: Order): Promise<Order> {
    const createdOrder = await lastValueFrom(
      this.orderService.createOrder(order)
    );
    return createdOrder;
  }
}
