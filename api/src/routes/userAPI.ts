import express from 'express';

const router = express.Router();

import authController from '../controllers/AuthAPIController';
import userController from '../controllers/UserAPIController';

// -- // -- // -- // -- //

router.get('/user/all', authController.isAdmin, userController.getAllUsers);

router.get('/user/:id', authController.isAuth, userController.getUser);

export default router;
