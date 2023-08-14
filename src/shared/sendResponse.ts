import { Response } from 'express';

export type IMeta = {
  page: number | null;
  limit: number | null;
  total?: number | null;
};

type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
  meta?: IMeta;
};

export const sendResponse = <T>(res: Response, obj: IApiResponse<T>) => {
  res.status(obj.statusCode).json({
    success: obj.success,
    message: obj.message || null,
    meta: obj.meta || null || undefined,
    data: obj.data || null,
  });
};
