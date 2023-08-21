"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, obj) => {
    res.status(obj.statusCode).json({
        success: obj.success,
        message: obj.message || null,
        meta: obj.meta || null || undefined,
        data: obj.data || null,
    });
};
exports.sendResponse = sendResponse;
