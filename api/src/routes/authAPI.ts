import express from 'express';
import authController from '../controllers/AuthAPIController';
import userController from '../controllers/UserAPIController';

const router = express.Router();

// POST: /register, /login

// -- // -- // -- // -- //

router.post('/register', userController.validateStore(), userController.storeUser);

router.post('/login', authController.validateLogin(), authController.login);

export default router;
