/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Empty } from "../common";

export const protobufPackage = "stock";

export interface GetByNameRequest {
  name: string;
}

export interface InventoryGRPC {
  stock: StockGRPC[];
}

export interface AddStockResponse {
  newQuantity: number;
}

export interface AddStockRequest {
  name: string;
  quantity: number;
}

export interface OrderGRPC {
  productName: string;
  quantity: number;
  username: string;
  date?: string | undefined;
}

export interface StockGRPC {
  product: ProductGRPC | undefined;
  quantity: number;
}

export interface ProductGRPC {
  name: string;
  price: number;
  id?: number | undefined;
}

export const STOCK_PACKAGE_NAME = "stock";

export interface StockServiceClient {
  getInventory(request: Empty, metadata?: Metadata): Observable<InventoryGRPC>;

  getStock(request: GetByNameRequest, metadata?: Metadata): Observable<StockGRPC>;

  getProduct(request: GetByNameRequest, metadata?: Metadata): Observable<ProductGRPC>;

  addStock(request: AddStockRequest, metadata?: Metadata): Observable<AddStockRequest>;

  addProduct(request: ProductGRPC, metadata?: Metadata): Observable<ProductGRPC>;
}

export interface StockServiceController {
  getInventory(request: Empty, metadata?: Metadata): Promise<InventoryGRPC> | Observable<InventoryGRPC> | InventoryGRPC;

  getStock(request: GetByNameRequest, metadata?: Metadata): Promise<StockGRPC> | Observable<StockGRPC> | StockGRPC;

  getProduct(
    request: GetByNameRequest,
    metadata?: Metadata,
  ): Promise<ProductGRPC> | Observable<ProductGRPC> | ProductGRPC;

  addStock(
    request: AddStockRequest,
    metadata?: Metadata,
  ): Promise<AddStockRequest> | Observable<AddStockRequest> | AddStockRequest;

  addProduct(request: ProductGRPC, metadata?: Metadata): Promise<ProductGRPC> | Observable<ProductGRPC> | ProductGRPC;
}

export function StockServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getInventory", "getStock", "getProduct", "addStock", "addProduct"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("StockService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("StockService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const STOCK_SERVICE_NAME = "StockService";
