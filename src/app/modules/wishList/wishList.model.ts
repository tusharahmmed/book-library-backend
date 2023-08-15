import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { IWishtList, WishListModel } from './wishList.interface';
import { WishlistConstant } from './wisthList.constant';

const wishListSchema = new Schema<IWishtList, WishListModel>({
  userId: {
    type: String,
    required: true,
    ref: 'User',
  },
  books: {
    required: true,
    type: [
      {
        bookId: {
          type: String,
          required: true,
          ref: 'Book',
          unique: true,
        },
        status: {
          type: String,
          required: true,
          enum: WishlistConstant.BOOK_STATUS,
        },
      },
    ],
  },
});

// statics

wishListSchema.statics.isWishListExist = async function (userId: string) {
  const exist = await WishList.findOne({ userId });

  return exist;
};

wishListSchema.statics.addBooktoList = async function (payload: IWishtList) {
  const { userId, books } = payload;

  // check duplicate entry
  const exist = await WishList.findOne({
    userId,
    'books.bookId': books[0]?.bookId,
  });

  if (exist) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Book is already exist');
  }
  // upadate list
  const result = await WishList.findOneAndUpdate(
    { userId },
    { $addToSet: { books: books[0] } },
    { new: true },
  )
    .populate('userId')
    .populate('books.bookId');

  return result;
};

export const WishList = model<IWishtList, WishListModel>(
  'Wish-list',
  wishListSchema,
);
