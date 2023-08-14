import { Router } from 'express';
import { validateZod } from '../../middlewares/validateZod';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = Router();

router.post(
  '/add-new',
  validateZod(BookValidation.addBookZodSchama),
  BookController.addNewBook,
);

router.patch(
  '/:id',
  validateZod(BookValidation.updateBookZodSchama),
  BookController.updateBook,
);

router.delete('/:id', BookController.deleteBook);

router.get('/:id', BookController.getSingleBook);
router.get('/', BookController.getAllBooks);

export const BookRoutes = router;
