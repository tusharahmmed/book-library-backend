import { Model, Types } from 'mongoose';
import { IBook } from '../book/book.interface';
import { IUser } from '../user/user.interface';

export type IBookList = {
  bookId: Types.ObjectId | IBook;
  status: 'wishlist' | 'currently reading';
};

export type IWishtList = {
  userId: Types.ObjectId | IUser;
  books: IBookList[];
};

export type WishListModel = {
  isWishListExist(userId: Types.ObjectId): Promise<IWishtList>;
  addBooktoList(payload: IWishtList): Promise<IWishtList>;
} & Model<IUser, Record<string, never>>;
