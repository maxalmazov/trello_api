import { HttpStatusCode } from '../enum/HttpStatusCode';
import BaseError from './BaseError';

class BadRequestError extends BaseError
{
  constructor(message: string)
  {
    super(message, 'BadRequestError', HttpStatusCode.BAD_REQUEST);
  }
}

export default BadRequestError;
