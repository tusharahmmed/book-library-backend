import { z } from 'zod';
import { WishlistConstant } from './wisthList.constant';

const createWishListZodSchama = z.object({
  body: z.object({
    userId: z.string({ required_error: 'User Id is required' }),
    books: z.array(
      z.object({
        bookId: z.string({ required_error: 'Book id is required' }),
        status: z.enum(
          [...WishlistConstant.BOOK_STATUS] as [string, ...string[]],
          { required_error: 'Book id is required' },
        ),
      }),
    ),
  }),
});

const changeStatusWishListZodSchama = z.object({
  body: z.object({
    _id: z.string({ required_error: '_id is required' }),
    bookId: z.string({ required_error: 'Book id is required' }),
    status: z.enum([...WishlistConstant.BOOK_STATUS] as [string, ...string[]], {
      required_error: 'Status id is required',
    }),
  }),
});

const removeBookWishListZodSchama = z.object({
  body: z.object({
    _id: z.string({ required_error: '_id is required' }),
  }),
});

export const WishListValidation = {
  createWishListZodSchama,
  changeStatusWishListZodSchama,
  removeBookWishListZodSchama,
};
