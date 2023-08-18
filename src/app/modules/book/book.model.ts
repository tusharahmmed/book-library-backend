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
    image: {
      type: String,
      default:
        'https://ik.imagekit.io/v1/next-level/imageonline-co-placeholder-image.png',
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

// satics
bookSchama.statics.sameAuthor = async function (
  userId: string,
  bookId: string,
) {
  const result = await Book.findOne({ _id: bookId, authorId: userId });

  if (result) {
    return true;
  } else {
    return false;
  }
};

export const Book = model<IBook, BookModel>('Book', bookSchama);
