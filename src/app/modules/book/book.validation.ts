import { z } from 'zod';
import { BookContant } from './book.constant';

const addBookZodSchama = z.object({
  body: z.object({
    title: z.string({ required_error: 'Titel is required' }),
    author: z.string({ required_error: 'Author is required' }),
    genres: z.enum([...BookContant.BOOK_GENRE] as [string, ...string[]], {
      required_error: 'Genre is required',
    }),
    publicationDate: z.string({
      required_error: 'Publication Date is required',
    }),
  }),
});

const updateBookZodSchama = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genres: z
      .enum([...BookContant.BOOK_GENRE] as [string, ...string[]])
      .optional(),
    publicationDate: z.string().optional(),
  }),
});

export const BookValidation = {
  addBookZodSchama,
  updateBookZodSchama,
};
