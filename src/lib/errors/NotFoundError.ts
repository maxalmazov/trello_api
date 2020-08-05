import { HttpStatusCode } from '../enum/HttpStatusCode';
import BaseError from './BaseError';

class NotFoundError extends BaseError
{
  constructor(message: string) {
    super(message, 'NotFoundError', HttpStatusCode.NOT_FOUND);
  }
}

export default NotFoundError;
