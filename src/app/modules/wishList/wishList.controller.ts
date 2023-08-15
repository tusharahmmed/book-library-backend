import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { WishListService } from './wishList.service';

// create new
const createNewWishList: RequestHandler = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await WishListService.createNewWishList(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlist created successfully',
    data: result,
  });
});

// get by user id
const getWishListByUserID: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const { _id } = req.user as JwtPayload;

  // chekck requested user
  if (id !== _id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }

  const result = await WishListService.getWishListByUserID(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlist retrived successfully',
    data: result,
  });
});

// delete by user id
const deleteWishListByUserID: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const { _id } = req.user as JwtPayload;

  // chekck requested user
  if (id !== _id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }

  const result = await WishListService.deleteWishListByUserID(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlist deleted successfully',
    data: result,
  });
});

// update by user id
const updateStatus: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const { _id } = req.user as JwtPayload;

  // chekck requested user
  if (id !== _id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }

  const result = await WishListService.updateStatus(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlist status updated successfully',
    data: result,
  });
});

// remove book
const removeBook: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  const { _id } = req.user as JwtPayload;

  // chekck requested user
  if (id !== _id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }

  const result = await WishListService.removeBook(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Wishlist book removed successfully',
    data: result,
  });
});

export const WishListController = {
  createNewWishList,
  getWishListByUserID,
  deleteWishListByUserID,
  updateStatus,
  removeBook,
};
