import {
  GetOrdersResponse,
  ORDER_PACKAGE_NAME,
  ORDER_SERVICE_NAME,
  OrderGRPC,
  OrderServiceClient,
  OrderServiceController,
  OrderServiceControllerMethods,
} from './order/order';

import {
  GetUsersResponse,
  USER_PACKAGE_NAME,
  USER_SERVICE_NAME,
  UserGRPC,
  UserServiceClient,
  UserServiceController,
  UserServiceControllerMethods,
} from './order/user';

import {
  AddStockRequest,
  AddStockResponse,
  GetByNameRequest,
  InventoryGRPC,
  ProductGRPC,
  STOCK_PACKAGE_NAME,
  STOCK_SERVICE_NAME,
  StockGRPC,
  protobufPackage,
  StockServiceClient,
  StockServiceController,
  StockServiceControllerMethods,
} from './stock/stock';

export {
  // Order
  GetOrdersResponse,
  ORDER_PACKAGE_NAME,
  ORDER_SERVICE_NAME,
  OrderGRPC,
  OrderServiceClient,
  OrderServiceController,
  OrderServiceControllerMethods,

  // User
  GetUsersResponse,
  USER_PACKAGE_NAME,
  USER_SERVICE_NAME,
  UserGRPC,
  UserServiceClient,
  UserServiceController,
  UserServiceControllerMethods,

  // Stock
  AddStockRequest,
  AddStockResponse,
  GetByNameRequest,
  InventoryGRPC,
  ProductGRPC,
  STOCK_PACKAGE_NAME,
  STOCK_SERVICE_NAME,
  StockGRPC,
  protobufPackage,
  StockServiceClient,
  StockServiceController,
  StockServiceControllerMethods,
};

export * from './common';
