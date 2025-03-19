import express from 'express';
import { body } from 'express-validator';

const router = express.Router();

import authController from '../controllers/AuthAPIController';
import userController from '../controllers/UserAPIController';

// -- // -- // -- // -- //

router.post('/register', userController.validateStore(), userController.storeUser);

router.post('/login', authController.validateLogin(), authController.login);

export default router;
