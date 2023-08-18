import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { validateZod } from '../../middlewares/validateZod';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = Router();

router.post(
  '/add-new',
  validateZod(BookValidation.addBookZodSchama),
  auth(),
  BookController.addNewBook,
);

router.patch(
  '/:id',
  validateZod(BookValidation.updateBookZodSchama),
  auth(),
  BookController.updateBook,
);

router.delete('/:id', auth(), BookController.deleteBook);

router.get('/:id', BookController.getSingleBook);
router.get('/', BookController.getAllBooks);

export const BookRoutes = router;
