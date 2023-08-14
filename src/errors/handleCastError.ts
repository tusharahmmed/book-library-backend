import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interface/error';
import { IGenericErrorResponse } from '../interface/response';

const handleCastError = (
  error: mongoose.Error.CastError,
): IGenericErrorResponse => {
  // error messages
  const errorMessages: IGenericErrorMessage[] = [
    {
      path: error?.path || '',
      message: 'Invalid _id',
    },
  ];

  // return simplify error message
  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: error.name,
    errorMessages,
  };
};

export default handleCastError;
