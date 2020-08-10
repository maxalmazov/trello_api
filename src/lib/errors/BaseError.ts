import { HttpStatusCode } from '../enum/HttpStatusCode';

abstract class BaseError extends Error {
  public readonly name;
  public readonly httpCode;

  protected constructor(
    message = 'Something went wrong. Please, try later.',
    name = 'InternalServerError',
    httpCode: HttpStatusCode = HttpStatusCode.INTERNAL_SERVER_ERROR,
  ) {
    super(message);

    this.name = name;
    this.httpCode = httpCode;

    Error.captureStackTrace(this);
  }
}

export default BaseError;
