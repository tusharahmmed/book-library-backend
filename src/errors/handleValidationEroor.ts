import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interface/error';
import { IGenericErrorResponse } from '../interface/response';

const handleValidationEroor = (
  err: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errorMessages: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    },
  );
  // return simplify error message
  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Validation Error',
    errorMessages,
  };
};

export default handleValidationEroor;
