import { Schema, model } from 'mongoose';
import { BookContant } from './book.constant';
import { BookModel, IBook } from './book.interface';

const bookSchama = new Schema<IBook, BookModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    genres: {
      type: [String],
      required: true,
      enum: {
        values: BookContant.BOOK_GENRE,
      },
    },
    publicationYear: {
      type: String,
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export const Book = model<IBook, BookModel>('Book', bookSchama);
