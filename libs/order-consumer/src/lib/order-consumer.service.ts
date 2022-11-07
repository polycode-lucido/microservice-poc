import { Order, User } from '@microservice-poc/entities';
import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrderConsumerService {
  private readonly url = 'http://localhost:3001/api';

  constructor(private readonly httpService: HttpService) {}

  async getUsers(): Promise<User> {
    const request = this.httpService.get(`${this.url}/user`);

    const { data } = await firstValueFrom(request);
    return data;
  }

  async getOrders(): Promise<Order> {
    const request = this.httpService.get(`${this.url}/order`);

    const { data } = await firstValueFrom(request);
    return data;
  }

  async createUser(user: User) {
    const request = this.httpService.post(`${this.url}/user/`, user);

    const { data } = await firstValueFrom(request);
    return data;
  }

  async createOrder(order: Order) {
    const request = this.httpService.post(`${this.url}/order/`, order);

    try {
      const { data } = await firstValueFrom(request);
      return data;
    } catch (error) {
      if (error.response.status) {
        throw new HttpException(error.response.data, error.response.status);
      }
    }
  }
}
