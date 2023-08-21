"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const book_constant_1 = require("./book.constant");
const addBookZodSchama = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Titel is required' }),
        author: zod_1.z.string({ required_error: 'Author is required' }),
        image: zod_1.z.string().optional(),
        genres: zod_1.z.array(zod_1.z.enum([...book_constant_1.BookContant.BOOK_GENRE], {
            required_error: 'Genre is required',
        })),
        publicationYear: zod_1.z.string({
            required_error: 'Publication Date is required',
        }),
    }),
});
const updateBookZodSchama = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        genres: zod_1.z
            .array(zod_1.z.enum([...book_constant_1.BookContant.BOOK_GENRE]))
            .optional(),
        publicationYear: zod_1.z.string().optional(),
    }),
});
exports.BookValidation = {
    addBookZodSchama,
    updateBookZodSchama,
};
