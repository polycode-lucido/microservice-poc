import { Metadata } from '@grpc/grpc-js';
import {
  Empty,
  GetUsersResponse,
  UserGRPC,
  UserServiceController,
  UserServiceControllerMethods,
} from '@microservice-poc/entities';
import { AppBaseErrorToHttpFilter } from '@microservice-poc/error';
import { UseFilters } from '@nestjs/common';
import { Observable } from 'rxjs';
import { OrderProviderService } from './order-provider.service';

@UseFilters(AppBaseErrorToHttpFilter)
@UserServiceControllerMethods()
export class UserProviderController implements UserServiceController {
  constructor(private readonly orderProviderService: OrderProviderService) {}

  getUsers(
    request: Empty,
    metadata?: Metadata
  ):
    | GetUsersResponse
    | Promise<GetUsersResponse>
    | Observable<GetUsersResponse> {
    return { users: this.orderProviderService.getUsers() };
  }

  createUser(
    request: UserGRPC,
    metadata?: Metadata
  ): UserGRPC | Promise<UserGRPC> | Observable<UserGRPC> {
    return this.orderProviderService.createUser(request);
  }
}
