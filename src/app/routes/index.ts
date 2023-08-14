import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

// use
moduleRoutes.forEach(module => {
  router.use(module.path, module.route);
});

export const ApplicationRoutes = router;
