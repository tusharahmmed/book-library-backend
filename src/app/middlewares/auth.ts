import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelper';

export const auth =
  () =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get token
      const authoriedToken = req.headers.authorization;
      if (!authoriedToken) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Not Authorized!');
      }

      // verify token
      let verifiedUser = null;
      try {
        verifiedUser = await jwtHelpers.verifyToken(
          authoriedToken,
          config.jwt.secret as Secret,
        );
      } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Authorization Failed!');
      }

      // set requested verified user
      req.user = verifiedUser as JwtPayload;

      
      // go to next
      return next();
    } catch (error) {
      next(error);
    }
  };
