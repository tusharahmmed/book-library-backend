import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { validateZod } from '../../middlewares/validateZod';
import { WishListController } from './wishList.controller';
import { WishListValidation } from './wishtList.validation';

const router = Router();

router.post(
  '/add-new',
  validateZod(WishListValidation.createWishListZodSchama),
  auth(),
  WishListController.createNewWishList,
);

router.patch(
  '/remove/:id',
  validateZod(WishListValidation.removeBookWishListZodSchama),
  auth(),
  WishListController.removeBook,
);

router.patch(
  '/:id',
  validateZod(WishListValidation.changeStatusWishListZodSchama),
  auth(),
  WishListController.updateStatus,
);

router.delete('/:id', auth, WishListController.deleteWishListByUserID);

router.get('/:id', auth(), WishListController.getWishListByUserID);

export const WishListRoutes = router;
