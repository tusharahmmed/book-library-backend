/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

type genryType = 'Fiction' | 'Novel' | 'Mystery' | 'History' | 'Romance';

export type IBook = {
  title: string;
  author: string;
  image?: string;
  genres: genryType[];
  publicationYear: string;
  authorId: Types.ObjectId | IUser;
};

export interface BookModel extends Model<IBook, Record<string, never>> {
  sameAuthor(userId: string, bookId: string): Promise<boolean>;
}

export type IBookFilters = {
  searchTerm?: string;
  genres?: string;
  publicationYear?: string;
};
