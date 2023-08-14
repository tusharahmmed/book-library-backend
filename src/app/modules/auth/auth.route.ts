import { Router } from 'express';
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
  AuthController.refreshToken,
);

router.get(
  '/',
  validateZod(AuthValidation.getUserZodSchema),
  AuthController.getUser,
);

export const AuthRoutes = router;
