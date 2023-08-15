import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookRoutes } from '../modules/book/book.route';
import { WishListRoutes } from '../modules/wishList/wishList.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/wish-lists',
    route: WishListRoutes,
  },
];

// use
moduleRoutes.forEach(module => {
  router.use(module.path, module.route);
});

export const ApplicationRoutes = router;
