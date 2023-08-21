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
exports.WishListService = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const mongoose_1 = __importDefault(require("mongoose"));
const wishList_model_1 = require("./wishList.model");
// create
const createNewWishList = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check exist
    const existList = yield wishList_model_1.WishList.isWishListExist(payload.userId);
    let result = null;
    if (!existList) {
        result = yield wishList_model_1.WishList.create(payload);
        // return new list with populate
        const newList = (yield result.populate('userId')).populate('books.bookId');
        return newList;
    }
    result = yield wishList_model_1.WishList.addBooktoList(payload);
    return result;
});
// get wishlist by user id
const getWishListByUserID = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishList_model_1.WishList.findOne({ userId })
        .populate('userId')
        .populate('books.bookId');
    return result;
});
// delete wishlist by user id
const deleteWishListByUserID = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishList_model_1.WishList.findOneAndDelete({ userId })
        .populate('userId')
        .populate('books.bookId');
    return result;
});
// update status
const updateStatus = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = payload, others = __rest(payload, ["_id"]);
    // initialize session
    const session = yield mongoose_1.default.startSession();
    let resultData = null;
    try {
        // start transaction
        session.startTransaction();
        // remove old status
        const removed = yield wishList_model_1.WishList.findOneAndUpdate({ userId }, {
            $pull: { books: { _id: _id } },
        });
        // add new status
        const result = yield wishList_model_1.WishList.findOneAndUpdate({ userId }, {
            $addToSet: { books: others },
        }, { new: true })
            .populate('userId')
            .populate('books.bookId');
        resultData = result;
        // commit & end the session
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        // if error abort & end session
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    return resultData;
});
// remove book from list
const removeBook = (userId, { _id }) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishList_model_1.WishList.findOneAndUpdate({ userId }, {
        $pull: { books: { _id } },
    }, { new: true })
        .populate('userId')
        .populate('books.bookId');
    return result;
});
exports.WishListService = {
    createNewWishList,
    getWishListByUserID,
    deleteWishListByUserID,
    updateStatus,
    removeBook,
};
