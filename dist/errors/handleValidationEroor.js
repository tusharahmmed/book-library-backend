"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handleValidationEroor = (err) => {
    const errorMessages = Object.values(err.errors).map((el) => {
        return {
            path: el === null || el === void 0 ? void 0 : el.path,
            message: el === null || el === void 0 ? void 0 : el.message,
        };
    });
    // return simplify error message
    return {
        statusCode: http_status_1.default.BAD_REQUEST,
        message: 'Validation Error',
        errorMessages,
    };
};
exports.default = handleValidationEroor;
