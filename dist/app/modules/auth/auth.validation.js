"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
// Define the Zod schema for IName
// Define the Zod schema for IUser
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required' }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
        fullName: zod_1.z.string({ required_error: 'Full name is required' }),
    }),
});
// login validation
const loginUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required' }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
// refresh token validation
const refreshTokenZodScehma = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({ required_error: 'Refresh token is required' }),
    }),
});
// get user validation
const getUserZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({ required_error: 'Refresh token is required' }),
    }),
});
// get user validation
const logoutUserZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({ required_error: 'Refresh token is required' }),
    }),
});
exports.AuthValidation = {
    createUserZodSchema,
    loginUserZodSchema,
    refreshTokenZodScehma,
    getUserZodSchema,
    logoutUserZodSchema,
};
