import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (
  payload: jwt.JwtPayload,
  secretKey: Secret,
  expireTime: string,
) => {
  return jwt.sign(payload, secretKey, { expiresIn: expireTime });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
export const jwtHelpers = {
  createToken,
  verifyToken,
};
