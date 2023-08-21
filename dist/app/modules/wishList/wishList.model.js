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
exports.WishList = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const wisthList_constant_1 = require("./wisthList.constant");
const wishListSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User',
    },
    books: {
        required: true,
        type: [
            {
                bookId: {
                    type: String,
                    required: true,
                    ref: 'Book',
                },
                status: {
                    type: String,
                    required: true,
                    enum: wisthList_constant_1.WishlistConstant.BOOK_STATUS,
                },
            },
        ],
    },
});
// statics
wishListSchema.statics.isWishListExist = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const exist = yield exports.WishList.findOne({ userId });
        return exist;
    });
};
wishListSchema.statics.addBooktoList = function (payload) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, books } = payload;
        // check duplicate entry
        const exist = yield exports.WishList.findOne({
            userId,
            'books.bookId': (_a = books[0]) === null || _a === void 0 ? void 0 : _a.bookId,
        });
        if (exist) {
            throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Book is already exist');
        }
        // upadate list
        const result = yield exports.WishList.findOneAndUpdate({ userId }, { $addToSet: { books: books[0] } }, { new: true })
            .populate('userId')
            .populate('books.bookId');
        return result;
    });
};
exports.WishList = (0, mongoose_1.model)('Wish-list', wishListSchema);
