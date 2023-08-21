"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handleZodError = (error) => {
    const errorMessages = error.errors.map((el) => {
        var _a, _b;
        const path = (_b = (_a = el === null || el === void 0 ? void 0 : el.path) === null || _a === void 0 ? void 0 : _a.slice(-1)) === null || _b === void 0 ? void 0 : _b.toString();
        return {
            path,
            message: el === null || el === void 0 ? void 0 : el.message,
        };
    });
    return {
        statusCode: http_status_1.default.BAD_REQUEST,
        message: 'Validation Error',
        errorMessages,
    };
};
exports.default = handleZodError;
