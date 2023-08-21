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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const book_constant_1 = require("./book.constant");
const bookSchama = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: 'https://ik.imagekit.io/v1/next-level/imageonline-co-placeholder-image.png',
    },
    genres: {
        type: [String],
        required: true,
        enum: {
            values: book_constant_1.BookContant.BOOK_GENRE,
        },
    },
    publicationYear: {
        type: String,
        required: true,
    },
    authorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});
// satics
bookSchama.statics.sameAuthor = function (userId, bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield exports.Book.findOne({ _id: bookId, authorId: userId });
        if (result) {
            return true;
        }
        else {
            return false;
        }
    });
};
exports.Book = (0, mongoose_1.model)('Book', bookSchama);
