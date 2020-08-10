import BaseError from './errors/BaseError';
import { NextFunction, Request, Response } from 'express';
import ServerError from './errors/ServerError';
import { HttpStatusCode } from './enum/HttpStatusCode';

interface ErrorResponse {
  success: 0|1,
  error: string,
  message: string,
  httpCode: HttpStatusCode,
}

export const asyncHandler = (action: (...args) => {}) => (...args) => {
  const actionReturn = action(...args);
  const next = args[args.length - 1];

  return Promise.resolve(actionReturn).catch(next);
};

export const ErrorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const createErrorResponse = (error: BaseError): ErrorResponse => ({
    success: 0,
    error: error.name,
    message: error.message,
    httpCode: error.httpCode,
  });

  const sendErrorResponse = (errorResponse: ErrorResponse) => {
    response.status(errorResponse.httpCode).send(errorResponse);
  };

  if (error instanceof BaseError) {
    sendErrorResponse(createErrorResponse(error));
  } else {
    // TODO: create logger to know what's happen
    const serverError = new ServerError();
    sendErrorResponse(createErrorResponse(serverError));
  }
};

export default ErrorHandler;
