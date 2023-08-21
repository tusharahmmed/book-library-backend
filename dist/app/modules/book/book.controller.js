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
exports.BookController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = require("../../../shared/sendResponse");
const book_constant_1 = require("./book.constant");
const book_service_1 = require("./book.service");
// get all books
const getAllBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // filters
    const filters = (0, pick_1.default)(req.query, book_constant_1.BookContant.FILTERS_FIELD);
    // pagination
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.PAGINATION_FIELD);
    const result = yield book_service_1.BookService.getAllBooks(filters, paginationOptions);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Books retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
// get single book
const getSingleBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const result = yield book_service_1.BookService.getSingleBook(bookId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Book retrieved successfully',
        data: result,
    });
}));
// delete single book
const deleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const user = req.user;
    const result = yield book_service_1.BookService.deleteBook(user, bookId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Book deleted successfully',
        data: result,
    });
}));
// add new book
const addNewBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield book_service_1.BookService.addNewBook(data);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Book created successfully',
        data: result,
    });
}));
// update book
const updateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { id } = req.params;
    const user = req.user;
    const result = yield book_service_1.BookService.updateBook(id, user, data);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Book updated successfully',
        data: result,
    });
}));
// get my books
const getMyBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = req.user;
    const result = yield book_service_1.BookService.getMyBooks(id, user);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Books retrieved successfully',
        data: result,
    });
}));
exports.BookController = {
    getAllBooks,
    getSingleBook,
    deleteBook,
    addNewBook,
    updateBook,
    getMyBooks,
};
