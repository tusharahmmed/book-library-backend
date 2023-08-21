"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const handleMongoServerError = (error) => {
    // error messages
    const errorMessages = [
        {
            path: `${Object.keys(error.keyPattern)[0]}` || '',
            message: `${Object.values(error.keyValue)[0]} is already exist`,
        },
    ];
    // return simplify error message
    return {
        statusCode: http_status_1.default.BAD_REQUEST,
        message: `${Object.keys(error.keyPattern)[0]} is already exist`,
        errorMessages,
    };
};
exports.default = handleMongoServerError;
