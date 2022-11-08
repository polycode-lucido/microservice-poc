/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Empty } from "../common";

export const protobufPackage = "order";

export interface GetOrdersResponse {
  orders: OrderGRPC[];
}

export interface OrderGRPC {
  productName: string;
  quantity: number;
  username: string;
  date?: string | undefined;
}

export const ORDER_PACKAGE_NAME = "order";

export interface OrderServiceClient {
  getOrders(request: Empty, metadata?: Metadata): Observable<GetOrdersResponse>;

  createOrder(request: OrderGRPC, metadata?: Metadata): Observable<OrderGRPC>;
}

export interface OrderServiceController {
  getOrders(
    request: Empty,
    metadata?: Metadata,
  ): Promise<GetOrdersResponse> | Observable<GetOrdersResponse> | GetOrdersResponse;

  createOrder(request: OrderGRPC, metadata?: Metadata): Promise<OrderGRPC> | Observable<OrderGRPC> | OrderGRPC;
}

export function OrderServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getOrders", "createOrder"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("OrderService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("OrderService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ORDER_SERVICE_NAME = "OrderService";
