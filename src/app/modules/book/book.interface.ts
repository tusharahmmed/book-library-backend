import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

type genryType = 'Fiction' | 'Novel' | 'Mystery' | 'History' | 'Romance';

export type IBook = {
  title: string;
  author: string;
  genres: genryType[];
  publicationYear: string;
  authorId: Types.ObjectId | IUser;
};

export type BookModel = Model<IBook, Record<string, never>>;

export type IBookFilters = {
  searchTerm?: string;
  genres?: string;
  publicationYear?: string;
};
