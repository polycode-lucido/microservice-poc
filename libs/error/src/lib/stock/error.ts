import { HttpException, HttpStatus } from '@nestjs/common';
import { AppBaseError } from '../baseError.error';

export abstract class StockError extends AppBaseError {}

export class InsufficientStockError extends StockError {
  constructor(currentStock: number, requestedStock: number) {
    super(
      `Insufficient stock. Current stock: ${currentStock}, requested stock: ${requestedStock}`
    );
  }
}

export class StockNotFoundError extends StockError {
  constructor(name: string) {
    super(`Stock not found: ${name}`);
  }
}

export class ProductAlreadyExistsError extends StockError {
  constructor(name: string) {
    super(`Product already exists: ${name}`);
  }
}

export class ProductNotFoundError extends StockError {
  constructor(name: string) {
    super(`Product not found: ${name}`);
  }
}

export const stockCatcher = (error: StockError) => {
  if (
    error instanceof InsufficientStockError ||
    error instanceof ProductAlreadyExistsError
  ) {
    return new HttpException(error.message, HttpStatus.CONFLICT);
  } else if (
    error instanceof StockNotFoundError ||
    error instanceof ProductNotFoundError
  ) {
    return new HttpException(error.message, HttpStatus.NOT_FOUND);
  } else {
    return error;
  }
};
