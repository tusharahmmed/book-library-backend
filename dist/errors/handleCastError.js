"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handleCastError = (error) => {
    // error messages
    const errorMessages = [
        {
            path: (error === null || error === void 0 ? void 0 : error.path) || '',
            message: 'Invalid _id',
        },
    ];
    // return simplify error message
    return {
        statusCode: http_status_1.default.BAD_REQUEST,
        message: error.name,
        errorMessages,
    };
};
exports.default = handleCastError;
