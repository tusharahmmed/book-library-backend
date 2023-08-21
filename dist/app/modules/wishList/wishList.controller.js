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
exports.WishListController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = require("../../../shared/sendResponse");
const wishList_service_1 = require("./wishList.service");
// create new
const createNewWishList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield wishList_service_1.WishListService.createNewWishList(payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Wishlist created successfully',
        data: result,
    });
}));
// get by user id
const getWishListByUserID = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { _id } = req.user;
    // chekck requested user
    if (id !== _id) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden');
    }
    const result = yield wishList_service_1.WishListService.getWishListByUserID(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Wishlist retrived successfully',
        data: result,
    });
}));
// delete by user id
const deleteWishListByUserID = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { _id } = req.user;
    // chekck requested user
    if (id !== _id) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden');
    }
    const result = yield wishList_service_1.WishListService.deleteWishListByUserID(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Wishlist deleted successfully',
        data: result,
    });
}));
// update by user id
const updateStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const { _id } = req.user;
    // chekck requested user
    if (id !== _id) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden');
    }
    const result = yield wishList_service_1.WishListService.updateStatus(id, payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Wishlist status updated successfully',
        data: result,
    });
}));
// remove book
const removeBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const { _id } = req.user;
    // chekck requested user
    if (id !== _id) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden');
    }
    const result = yield wishList_service_1.WishListService.removeBook(id, payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Wishlist book removed successfully',
        data: result,
    });
}));
exports.WishListController = {
    createNewWishList,
    getWishListByUserID,
    deleteWishListByUserID,
    updateStatus,
    removeBook,
};
