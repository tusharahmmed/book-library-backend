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
exports.BookService = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const pagination_1 = require("../../../helpers/pagination");
const book_constant_1 = require("./book.constant");
const book_model_1 = require("./book.model");
// get all books
const getAllBooks = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // filtering
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const bookFilterableFields = book_constant_1.BookContant.SEARCHABLE_FIELD;
    const andConditions = [];
    // search in searchable fields
    if (searchTerm) {
        andConditions.push({
            $or: bookFilterableFields.map(field => {
                return {
                    [field]: {
                        $regex: searchTerm,
                        $options: 'i',
                    },
                };
            }),
        });
    }
    // filter for exact match in filtered fields
    if (Object.keys(filterData).length) {
        andConditions.push({
            $and: Object.entries(filterData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // pagination
    const { page, limit, skip, sortBy, sortOrder } = pagination_1.paginationHelper.calculatePagination(paginationOptions);
    // sort conditions
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    // query conditons
    const queryCondition = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield book_model_1.Book.find(queryCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield book_model_1.Book.count(queryCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// get single book
const getSingleBook = (bookID) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById(bookID).populate('authorId');
    return result;
});
// delete book
const deleteBook = (user, bookID) => __awaiter(void 0, void 0, void 0, function* () {
    // check same author
    const sameAuthor = yield book_model_1.Book.sameAuthor(user._id, bookID);
    if (!sameAuthor) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden');
    }
    const result = yield book_model_1.Book.findByIdAndDelete(bookID);
    return result;
});
// add new book
const addNewBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // remove empty img
    let data = payload;
    if (payload.image === '') {
        const { image } = payload, others = __rest(payload, ["image"]);
        data = others;
    }
    const result = yield book_model_1.Book.create(data);
    return result;
});
// update a book
const updateBook = (id, user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check same author
    const sameAuthor = yield book_model_1.Book.sameAuthor(user._id, id);
    if (!sameAuthor) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden');
    }
    const result = yield book_model_1.Book.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
// update a book
const getMyBooks = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    // check same user
    if (user._id !== id) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden');
    }
    const result = yield book_model_1.Book.find({ authorId: id });
    return result;
});
exports.BookService = {
    getAllBooks,
    getSingleBook,
    deleteBook,
    addNewBook,
    updateBook,
    getMyBooks,
};
