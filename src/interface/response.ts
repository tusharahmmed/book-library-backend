import { IMeta } from '../shared/sendResponse';
import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IServiceFunction<T> = {
  meta: IMeta;
  data: T;
};
