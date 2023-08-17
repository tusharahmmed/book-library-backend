/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelper';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';
import {
  ILoginPayload,
  ILoginResponse,
  IRefreshTokenResponse,
} from './auth.interface';

import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';

const createUser = async (payload: IUser) => {
  const result = await User.create(payload);

  // if not create user
  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong',
    );
  }

  const { email, _id } = result;

  const accessToken = jwtHelpers.createToken(
    { _id, email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { _id, email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    user: result,
  };
};

// log in user
const loginUser = async (payload: ILoginPayload): Promise<ILoginResponse> => {
  // check user exist
  const user: any = await User.isUserExist(payload.email);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // check password
  if (
    user.password &&
    !(await User.isPasswordMatched(payload.password, user.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not matched');
  }

  // generate token
  const { email, _id } = user as any;

  const accessToken = jwtHelpers.createToken(
    { _id, email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { _id, email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  //
  const { password, ...othersField } = user._doc as any;

  return {
    accessToken,
    refreshToken,
    user: othersField as IUser,
  };
};

// refresh token
const refreshToken = async (
  refreshToken: string,
): Promise<IRefreshTokenResponse> => {
  // varify user
  let verifiedUser = null;

  // check invalid token
  try {
    verifiedUser = jwtHelpers.verifyToken(
      refreshToken,
      config.jwt.refresh_secret as Secret,
    ) as JwtPayload;
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }

  // check user exist
  const { _id } = verifiedUser;
  const user = new User();
  const userExist = await User.findById(_id);

  if (!userExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // generate new accessToken
  const newAccessToken = jwtHelpers.createToken(
    { _id: userExist.id, role: userExist.email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken: newAccessToken,
    user: userExist,
  };
};

// get user
const getUser = async (token: string, user: JwtPayload) => {
  console.log(user);
  if (!user?.email) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }

  // return the user
  const result = await User.findOne(
    { email: user?.email },
    { createdAt: 0, updatedAt: 0, __v: 0 },
  );

  console.log(result);
  return {
    accessToken: token,
    user: result,
  };
};

export const AuthService = {
  createUser,
  loginUser,
  refreshToken,
  getUser,
};
