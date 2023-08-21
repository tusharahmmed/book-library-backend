"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListValidation = void 0;
const zod_1 = require("zod");
const wisthList_constant_1 = require("./wisthList.constant");
const createWishListZodSchama = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: 'User Id is required' }),
        books: zod_1.z.array(zod_1.z.object({
            bookId: zod_1.z.string({ required_error: 'Book id is required' }),
            status: zod_1.z.enum([...wisthList_constant_1.WishlistConstant.BOOK_STATUS], { required_error: 'Book id is required' }),
        })),
    }),
});
const changeStatusWishListZodSchama = zod_1.z.object({
    body: zod_1.z.object({
        _id: zod_1.z.string({ required_error: '_id is required' }),
        bookId: zod_1.z.string({ required_error: 'Book id is required' }),
        status: zod_1.z.enum([...wisthList_constant_1.WishlistConstant.BOOK_STATUS], {
            required_error: 'Status id is required',
        }),
    }),
});
const removeBookWishListZodSchama = zod_1.z.object({
    body: zod_1.z.object({
        _id: zod_1.z.string({ required_error: '_id is required' }),
    }),
});
exports.WishListValidation = {
    createWishListZodSchama,
    changeStatusWishListZodSchama,
    removeBookWishListZodSchama,
};
