import {
  Inventory,
  Product,
  Stock,
  StockServiceClient,
  STOCK_PACKAGE_NAME,
  STOCK_SERVICE_NAME,
} from '@microservice-poc/entities';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StockConsumerService implements OnModuleInit {
  private stockService: StockServiceClient;

  constructor(@Inject(STOCK_PACKAGE_NAME) private stockClient: ClientGrpc) {}

  onModuleInit(): void {
    this.stockService =
      this.stockClient.getService<StockServiceClient>(STOCK_SERVICE_NAME);
  }

  async getInventory(): Promise<Inventory> {
    const request = this.stockService.getInventory({});

    const { stock } = await firstValueFrom(request);
    return stock as Inventory;
  }

  async getStock(name: string): Promise<Stock> {
    const request = this.stockService.getStock({ name });

    return (await firstValueFrom(request)) as Stock;
  }

  async getProduct(name: string): Promise<Product> {
    const request = this.stockService.getProduct({ name });

    return (await firstValueFrom(request)) as Product;
  }

  async addStock(name: string, quantity: number) {
    const request = this.stockService.addStock({ name, quantity });

    return await firstValueFrom(request);
  }

  async addProduct(product: Product) {
    return await firstValueFrom(this.stockService.addProduct(product));
  }
}
