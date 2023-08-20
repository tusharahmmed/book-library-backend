import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { validateZod } from '../../middlewares/validateZod';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = Router();

router.post(
  '/signup',
  validateZod(AuthValidation.createUserZodSchema),
  AuthController.createUser,
);

router.post(
  '/login',
  validateZod(AuthValidation.loginUserZodSchema),
  AuthController.loginUser,
);
router.post(
  '/refresh-token',
  validateZod(AuthValidation.refreshTokenZodScehma),
  auth(),
  AuthController.refreshToken,
);
router.post('/logout', auth(), AuthController.logoutUser);

router.get('/', auth(), AuthController.getUser);

export const AuthRoutes = router;
