/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Model, Types } from 'mongoose';

export type IUser = {
  email: string;
  password: string;
  fullName: string;
};

type IUserExist = Partial<IUser> & {
  _id: Types.ObjectId;
};

export interface UserModel extends Model<IUser> {
  isUserExist(email: string): IUserExist;
  isPasswordMatched(givenPassword: string, savedPassword: string): boolean;
}
