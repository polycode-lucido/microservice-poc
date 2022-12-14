import { Metadata } from '@grpc/grpc-js';
import {
  Empty,
  GetUsersResponse,
  UserGRPC,
  UserServiceController,
  UserServiceControllerMethods,
} from '@microservice-poc/entities';
import { Observable } from 'rxjs';
import { OrderProviderService } from './order-provider.service';

@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private readonly userService: OrderProviderService) {}
  getUsers(
    request: Empty,
    metadata?: Metadata
  ):
    | GetUsersResponse
    | Promise<GetUsersResponse>
    | Observable<GetUsersResponse> {
    return { users: this.userService.getUsers() };
  }
  createUser(
    request: UserGRPC,
    metadata?: Metadata
  ): UserGRPC | Promise<UserGRPC> | Observable<UserGRPC> {
    return this.userService.createUser(request);
  }
}
