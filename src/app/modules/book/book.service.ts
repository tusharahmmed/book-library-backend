import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/pagination';
import { IPaginationOptions } from '../../../interface/pagination';
import { IServiceFunction } from '../../../interface/response';
import { BookContant } from './book.constant';
import { IBook, IBookFilters } from './book.interface';
import { Book } from './book.model';

// get all books
const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions,
): Promise<IServiceFunction<IBook[]>> => {
  // filtering
  const { searchTerm, ...filterData } = filters;

  const bookFilterableFields = BookContant.SEARCHABLE_FIELD;
  const andConditions = [];

  // search in searchable fields
  if (searchTerm) {
    andConditions.push({
      $or: bookFilterableFields.map(field => {
        return {
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        };
      }),
    });
  }

  // filter for exact match in filtered fields
  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);
  // sort conditions
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  // query conditons
  const queryCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(queryCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Book.count(queryCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get single book
const getSingleBook = async (bookID: string) => {
  const result = await Book.findById(bookID);

  return result;
};

// delete book
const deleteBook = async (bookID: string) => {
  const result = await Book.findByIdAndDelete(bookID);

  return result;
};

// add new book
const addNewBook = async (payload: IBook) => {
  const result = await Book.create(payload);

  return result;
};

// update a book

const updateBook = async (id: string, payload: Partial<IBook>) => {
  const result = await Book.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

export const BookService = {
  getAllBooks,
  getSingleBook,
  deleteBook,
  addNewBook,
  updateBook,
};
