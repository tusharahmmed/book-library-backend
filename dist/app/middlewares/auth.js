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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const jwtHelper_1 = require("../../helpers/jwtHelper");
const auth = () => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get token
        const authoriedToken = req.headers.authorization;
        if (!authoriedToken) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Not Authorized!');
        }
        // verify token
        let verifiedUser = null;
        try {
            verifiedUser = yield jwtHelper_1.jwtHelpers.verifyToken(authoriedToken, config_1.default.jwt.secret);
        }
        catch (error) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Authorization Failed!');
        }
        // set requested verified user
        req.user = verifiedUser;
        // go to next
        return next();
    }
    catch (error) {
        next(error);
    }
});
exports.auth = auth;
