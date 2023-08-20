import { z } from 'zod';

// Define the Zod schema for IName

// Define the Zod schema for IUser
const createUserZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
    fullName: z.string({ required_error: 'Full name is required' }),
  }),
});

// login validation
const loginUserZodSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

// refresh token validation
const refreshTokenZodScehma = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required' }),
  }),
});

// get user validation
const getUserZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required' }),
  }),
});
// get user validation
const logoutUserZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required' }),
  }),
});

export const AuthValidation = {
  createUserZodSchema,
  loginUserZodSchema,
  refreshTokenZodScehma,
  getUserZodSchema,
  logoutUserZodSchema,
};
