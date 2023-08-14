import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';

export type IRequestedUser = JwtPayload & {
  _id: string | Types.ObjectId;
  email: string;
};
