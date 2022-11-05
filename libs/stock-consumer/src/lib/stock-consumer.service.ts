import { Inventory, Product, Stock } from '@microservice-poc/entities';
import {
  InsufficientStockError,
  ProductNotFoundError,
  StockNotFoundError,
} from '@microservice-poc/error';
import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StockConsumerService {
  private readonly url = 'http://localhost:3000/api';

  constructor(private readonly httpService: HttpService) {}

  async getInventory(): Promise<Inventory> {
    const request = this.httpService.get(`${this.url}/inventory`);

    const { data } = await firstValueFrom(request);
    return data;
  }

  async getStock(name: string): Promise<Stock> {
    const request = this.httpService.get(`${this.url}/stock/${name}`);

    try {
      const { data } = await firstValueFrom(request);
      return data;
    } catch (error) {
      if (error.response.status === 404) {
        throw new StockNotFoundError(name);
      }
    }
  }

  async getProduct(name: string): Promise<Product> {
    const request = this.httpService.get(`${this.url}/product/${name}`);

    try {
      const { data } = await firstValueFrom(request);
      return data;
    } catch (error) {
      if (error.response.status === 404) {
        throw new ProductNotFoundError(name);
      }
    }
  }

  async addStock(name: string, quantity: number) {
    const request = this.httpService.post(
      `${this.url}/stock/${name}/${quantity}`
    );

    try {
      const { data } = await firstValueFrom(request);
      return data;
    } catch (error) {
      if (error.response.status === 404) {
        throw new ProductNotFoundError(name);
      } else if (error.response.status === 409) {
        throw new HttpException(error.response.data, error.response.status);
      }
    }
  }

  async addProduct(product: Product) {
    const request = this.httpService.post(`${this.url}/product/`, product);

    const { data } = await firstValueFrom(request);
    return data;
  }
}
