import { Metadata } from '@grpc/grpc-js';
import {
  Empty,
  GetOrdersResponse,
  OrderGRPC,
  OrderServiceController,
  OrderServiceControllerMethods,
} from '@microservice-poc/entities';
import { AppBaseErrorToHttpFilter } from '@microservice-poc/error';
import { UseFilters } from '@nestjs/common';
import { Observable } from 'rxjs';
import { OrderProviderService } from './order-provider.service';

@UseFilters(AppBaseErrorToHttpFilter)
@OrderServiceControllerMethods()
export class OrderProviderController implements OrderServiceController {
  constructor(private readonly orderProviderService: OrderProviderService) {}

  getOrders(
    request: Empty,
    metadata?: Metadata
  ):
    | GetOrdersResponse
    | Promise<GetOrdersResponse>
    | Observable<GetOrdersResponse> {
    return { orders: this.orderProviderService.getOrders() };
  }

  createOrder(
    request: OrderGRPC,
    metadata?: Metadata
  ): OrderGRPC | Promise<OrderGRPC> | Observable<OrderGRPC> {
    return this.orderProviderService.createOrder(request);
  }
}
