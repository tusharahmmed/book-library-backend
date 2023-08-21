"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const user_model_1 = __importDefault(require("../user/user.model"));
const config_1 = __importDefault(require("../../../config"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.create(payload);
    // if not create user
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Something went wrong');
    }
    const { email, _id } = result;
    const accessToken = jwtHelper_1.jwtHelpers.createToken({ _id, email }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelper_1.jwtHelpers.createToken({ _id, email }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    const _a = result === null || result === void 0 ? void 0 : result._doc, { password } = _a, othersField = __rest(_a, ["password"]);
    return {
        accessToken,
        refreshToken,
        user: othersField,
    };
});
// log in user
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check user exist
    const user = yield user_model_1.default.isUserExist(payload.email);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // check password
    if (user.password &&
        !(yield user_model_1.default.isPasswordMatched(payload.password, user.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password does not matched');
    }
    // generate token
    const { email, _id } = user;
    const accessToken = jwtHelper_1.jwtHelpers.createToken({ _id, email }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelper_1.jwtHelpers.createToken({ _id, email }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    //
    const _b = user._doc, { password } = _b, othersField = __rest(_b, ["password"]);
    return {
        accessToken,
        refreshToken,
        user: othersField,
    };
});
// refresh token
const refreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    // varify user
    let verifiedUser = null;
    // check invalid token
    try {
        verifiedUser = jwtHelper_1.jwtHelpers.verifyToken(refreshToken, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid refresh token');
    }
    // check user exist
    const { _id } = verifiedUser;
    const user = new user_model_1.default();
    const userExist = yield user_model_1.default.findById(_id);
    if (!userExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // generate new accessToken
    const newAccessToken = jwtHelper_1.jwtHelpers.createToken({ _id: userExist.id, role: userExist.email }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
        user: userExist,
    };
});
// get user
const getUser = (token, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(user === null || user === void 0 ? void 0 : user.email)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized');
    }
    // return the user
    const result = yield user_model_1.default.findOne({ email: user === null || user === void 0 ? void 0 : user.email }, { createdAt: 0, updatedAt: 0, __v: 0 });
    return {
        accessToken: token,
        user: result,
    };
});
// log out
const logout = (token, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(user === null || user === void 0 ? void 0 : user.email)) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized');
    }
    return token;
});
exports.AuthService = {
    createUser,
    loginUser,
    refreshToken,
    getUser,
    logout,
};
