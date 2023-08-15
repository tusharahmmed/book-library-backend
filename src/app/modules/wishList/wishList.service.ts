/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Types } from 'mongoose';
import { IBookList, IWishtList } from './wishList.interface';
import { WishList } from './wishList.model';

// create
const createNewWishList = async (payload: IWishtList) => {
  // check exist
  const existList = await WishList.isWishListExist(
    payload.userId as Types.ObjectId,
  );

  let result = null;
  if (!existList) {
    result = await WishList.create(payload);

    // return new list with populate
    const newList = (await result.populate('userId')).populate('books.bookId');
    return newList;
  }

  result = await WishList.addBooktoList(payload);
  return result;
};

// get wishlist by user id
const getWishListByUserID = async (userId: string) => {
  const result = await WishList.findOne({ userId })
    .populate('userId')
    .populate('books.bookId');
  return result;
};

// delete wishlist by user id
const deleteWishListByUserID = async (userId: string) => {
  const result = await WishList.findOneAndDelete({ userId })
    .populate('userId')
    .populate('books.bookId');
  return result;
};

// update status
const updateStatus = async (
  userId: string,
  payload: IBookList & { _id: string },
) => {
  const { _id, ...others } = payload;

  // remove old status

  const removed = await WishList.findOneAndUpdate(
    { userId },
    {
      $pull: { books: { _id: _id } },
    },
  );
  // add new status
  const result = await WishList.findOneAndUpdate(
    { userId },
    {
      $addToSet: { books: others },
    },
    { new: true },
  )
    .populate('userId')
    .populate('books.bookId');

  return result;
};

// remove book from list
const removeBook = async (userId: string, { _id }: { _id: string }) => {
  const result = await WishList.findOneAndUpdate(
    { userId },
    {
      $pull: { books: { _id } },
    },
    { new: true },
  )
    .populate('userId')
    .populate('books.bookId');

  return result;
};

export const WishListService = {
  createNewWishList,
  getWishListByUserID,
  deleteWishListByUserID,
  updateStatus,
  removeBook,
};
