import { HttpStatusCode } from '../enum/HttpStatusCode';
import BaseError from './BaseError';

class ServerError extends BaseError
{
  constructor(message: string) {
    super(message, 'ServerError', HttpStatusCode.INTERNAL_SERVER_ERROR);
  }
}

export default ServerError;
