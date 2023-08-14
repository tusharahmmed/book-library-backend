import httpStatus from 'http-status';
import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorMessage } from '../interface/error';
import { IGenericErrorResponse } from '../interface/response';

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errorMessages: IGenericErrorMessage[] = error.errors.map(
    (el: ZodIssue) => {
      const path = el?.path?.slice(-1)?.toString();
      return {
        path,
        message: el?.message,
      };
    },
  );

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'Validation Error',
    errorMessages,
  };
};

export default handleZodError;
