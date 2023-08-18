import httpStatus from 'http-status';
import { PAGINATION_FIELD } from '../../../constants/pagination';
import { IRequestedUser } from '../../../interface/req.user';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { BookContant } from './book.constant';
import { BookService } from './book.service';

// get all books
const getAllBooks = catchAsync(async (req, res) => {
  // filters
  const filters = pick(req.query, BookContant.FILTERS_FIELD);

  // pagination
  const paginationOptions = pick(req.query, PAGINATION_FIELD);

  const result = await BookService.getAllBooks(filters, paginationOptions);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Books retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single book
const getSingleBook = catchAsync(async (req, res) => {
  const bookId = req.params.id;

  const result = await BookService.getSingleBook(bookId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book retrieved successfully',
    data: result,
  });
});

// delete single book
const deleteBook = catchAsync(async (req, res) => {
  const bookId = req.params.id;

  const user = req.user;

  const result = await BookService.deleteBook(user as IRequestedUser, bookId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book deleted successfully',
    data: result,
  });
});

// add new book
const addNewBook = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await BookService.addNewBook(data);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book created successfully',
    data: result,
  });
});

// update book
const updateBook = catchAsync(async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const result = await BookService.updateBook(id, data);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book updated successfully',
    data: result,
  });
});

export const BookController = {
  getAllBooks,
  getSingleBook,
  deleteBook,
  addNewBook,
  updateBook,
};
