import express from 'express';
import { body } from 'express-validator';

const router = express.Router();

import authController from '../controllers/AuthAPIController';
import userController from '../controllers/UserAPIController';

// -- // -- // -- // -- //

router.post(
  '/login',
  [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('El. pašto adresas privalomas')
      .escape()
      .isEmail()
      .withMessage('Neteisingas vartotjo el. pašto adresas'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Slaptažodis yra privalomas')
      .escape()
  ],
  authController.login
);

router.post('/register', userController.validateStore(), userController.storeUser);

export default router;
