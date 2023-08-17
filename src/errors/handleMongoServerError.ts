/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { IGenericErrorMessage } from '../interface/error';
import { IGenericErrorResponse } from '../interface/response';

const handleMongoServerError = (error: any): IGenericErrorResponse => {
  // error messages
  const errorMessages: IGenericErrorMessage[] = [
    {
      path: `${Object.keys(error.keyPattern)[0]}` || '',
      message: `${Object.values(error.keyValue)[0]} is already exist`,
    },
  ];

  // return simplify error message
  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: `${Object.keys(error.keyPattern)[0]} is already exist`,
    errorMessages,
  };
};

export default handleMongoServerError;
