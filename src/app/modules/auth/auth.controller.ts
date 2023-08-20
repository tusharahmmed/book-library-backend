/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await AuthService.createUser(payload);

  // set cookies
  const { refreshToken, ...others } = result;
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.env === 'production',
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users created successfully',
    data: others,
  });
});

// login user
const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const loginData = req.body;
  const result = await AuthService.loginUser(loginData);

  // set cookies
  const { refreshToken, ...others } = result;
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.env === 'production',
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: others,
  });
});

// refresh token
const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  // set cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.env === 'production',
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New access token generated successfully !',
    data: result,
  });
});

// get user
const getUser: RequestHandler = catchAsync(async (req, res) => {
  const requestedUser = req.user;
  const accessToken = req.headers.authorization;

  const result = await AuthService.getUser(
    accessToken as string,
    requestedUser as JwtPayload,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully retrived user',
    data: result,
  });
});

// login user
const logoutUser: RequestHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const requestedUser = req.user;

  const result = await AuthService.logout(
    refreshToken as string,
    requestedUser as JwtPayload,
  );

  // clear cookie
  res.clearCookie('refreshToken');

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged out successfully',
  });
});

export const AuthController = {
  createUser,
  loginUser,
  refreshToken,
  getUser,
  logoutUser,
};
