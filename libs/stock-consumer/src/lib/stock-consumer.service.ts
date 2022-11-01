import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StockConsumerService {
  private readonly url = 'http://localhost:3000';

  constructor(private readonly httpService: HttpService) {}

  async getInventory() {
    const request = this.httpService.get(`${this.url}/inventory`);

    const { data } = await firstValueFrom(request);
    return data;
  }

  async getStock(name: string) {
    const request = this.httpService.get(`${this.url}/stock/${name}`);

    const { data } = await firstValueFrom(request);
    return data;
  }

  async getProduct(name: string) {
    const request = this.httpService.get(`${this.url}/product/${name}`);

    const { data } = await firstValueFrom(request);
    return data;
  }
}
