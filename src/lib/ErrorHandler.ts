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

const createErrorResponse = (error: BaseError): ErrorResponse => ({
  success: 0,
  error: error.name,
  message: error.message,
  httpCode: error.httpCode,
});

const sendErrorResponse = (errorResponse: ErrorResponse, response: Response) => {
  response.status(errorResponse.httpCode).send(errorResponse);
};

export const ErrorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof BaseError) {
    sendErrorResponse(createErrorResponse(error), response);
  } else {
    // TODO: create logger to know what's happen
    const serverError = new ServerError();
    sendErrorResponse(createErrorResponse(serverError), response);
  }
};






export default ErrorHandler;
