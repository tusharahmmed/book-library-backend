import { RequestHandler } from 'express';
import httpStatus from 'http-status';
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
  const { accessToken } = req.body;

  const result = await AuthService.getUser(accessToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully retrived user',
    data: result,
  });
});

export const AuthController = {
  createUser,
  loginUser,
  refreshToken,
  getUser,
};
