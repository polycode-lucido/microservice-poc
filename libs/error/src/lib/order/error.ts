import { HttpException, HttpStatus } from '@nestjs/common';
import { AppBaseError } from '../baseError.error';

export abstract class OrderError extends AppBaseError {}

export class UserNotFoundError extends OrderError {
  constructor(name: string) {
    super(`User not found: ${name}`);
  }
}

export const orderCatcher = (error: OrderError) => {
  if (error instanceof UserNotFoundError) {
    return new HttpException(error.message, HttpStatus.NOT_FOUND);
  } else {
    return error;
  }
};
