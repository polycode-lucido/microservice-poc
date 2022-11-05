import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { AppBaseError } from './baseError.error';
import { stockCatcher, StockError } from './stock/error';

@Catch(AppBaseError)
export class AppBaseErrorToHttpFilter extends BaseExceptionFilter {
  catch(error: AppBaseError, host: ArgumentsHost) {
    Logger.error(
      error?.stack ? error.message : 'No message',
      'ExceptionFilter'
    );

    if (error instanceof StockError) {
      return super.catch(stockCatcher(error), host);
    }

    return super.catch(error, host);
  }
}
