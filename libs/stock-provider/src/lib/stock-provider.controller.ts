import { Metadata } from '@grpc/grpc-js';
import {
  AddStockRequest,
  GetByNameRequest,
  ProductGRPC,
  StockGRPC,
  StockServiceController,
  StockServiceControllerMethods,
} from '@microservice-poc/entities';
import { Observable } from 'rxjs';
import { StockProviderService } from './stock-provider.service';

@StockServiceControllerMethods()
export class StockProviderController implements StockServiceController {
  constructor(private readonly stockProviderService: StockProviderService) {}
  getProduct(
    request: GetByNameRequest,
    metadata?: Metadata
  ): ProductGRPC | Promise<ProductGRPC> | Observable<ProductGRPC> {
    return this.stockProviderService.getProduct(request.name);
  }
  getStock(
    request: GetByNameRequest,
    metadata?: Metadata
  ): StockGRPC | Promise<StockGRPC> | Observable<StockGRPC> {
    return this.stockProviderService.getStock(request.name);
  }
  addStock(
    request: AddStockRequest,
    metadata?: Metadata
  ): AddStockRequest | Promise<AddStockRequest> | Observable<AddStockRequest> {
    throw new Error('Method not implemented.');
  }
  addProduct(
    request: ProductGRPC,
    metadata?: Metadata
  ): ProductGRPC | Promise<ProductGRPC> | Observable<ProductGRPC> {
    throw new Error('Method not implemented.');
  }

  getInventory() {
    return { stock: this.stockProviderService.getInventory() };
  }
}
