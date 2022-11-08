import { Order, User } from '@microservice-poc/entities';
import { UserNotFoundError } from '@microservice-poc/error';
import { StockConsumerService } from '@microservice-poc/stock-consumer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderProviderService {
  constructor(private readonly stockConsumerService: StockConsumerService) {}

  private readonly orders: Order[] = [];
  private readonly users: User[] = [
    {
      username: 'test',
    },
  ];

  getOrders(): Order[] {
    return this.orders;
  }

  getUsers(): User[] {
    return this.users;
  }

  createUser(user: User): User {
    this.users.push(user);
    return user;
  }

  async createOrder(order: Order): Promise<Order> {
    const user = this.users.find(
      (currentUser) => order.username === currentUser.username
    );
    if (!user) {
      throw new UserNotFoundError(order.username);
    }

    const product = await this.stockConsumerService.getProduct(
      order.productName
    );

    await this.stockConsumerService.addStock(
      order.productName,
      -order.quantity
    );

    const newOrder: Order = {
      productName: product.name,
      quantity: order.quantity,
      username: user.username,
      date: new Date().toISOString(),
    };

    this.orders.push(newOrder);

    return newOrder;
  }
}
