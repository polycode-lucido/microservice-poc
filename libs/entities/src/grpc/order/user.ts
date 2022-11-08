/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Empty } from "../common";

export const protobufPackage = "user";

export interface GetUsersResponse {
  users: UserGRPC[];
}

export interface UserGRPC {
  username: string;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  getUsers(request: Empty, metadata?: Metadata): Observable<GetUsersResponse>;

  createUser(request: UserGRPC, metadata?: Metadata): Observable<UserGRPC>;
}

export interface UserServiceController {
  getUsers(
    request: Empty,
    metadata?: Metadata,
  ): Promise<GetUsersResponse> | Observable<GetUsersResponse> | GetUsersResponse;

  createUser(request: UserGRPC, metadata?: Metadata): Promise<UserGRPC> | Observable<UserGRPC> | UserGRPC;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getUsers", "createUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
