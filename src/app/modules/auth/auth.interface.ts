import { IUser } from '../user/user.interface';

export type ILoginPayload = {
  email: string;
  password: string;
};

export type ILoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: IUser;
};
export type IRefreshTokenResponse = {
  accessToken: string;
  user: IUser;
};
