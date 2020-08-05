import BaseError from './errors/BaseError';

const handle = (error: BaseError) => {
  // TODO: write log
  return {
    success: 0,
    error: error.name,
    message: error.message,
    httpCode: error.httpCode,
  };
};

export default handle;
