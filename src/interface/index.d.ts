/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { IRequestedUser } from './req.user';

declare global {
  namespace Express {
    interface Request {
      user: IRequestedUser | null;
    }
  }
}
