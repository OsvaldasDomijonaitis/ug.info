import express from 'express';

const router = express.Router();

import authController from '../controllers/AuthAPIController';
import userController from '../controllers/UserAPIController';

// -- // -- // -- // -- //

router.get('/user/all', authController.isAdmin, userController.getAllUsers);

router.get('/user/:id', authController.isAuth, userController.getUser);

router.post('/user/all', authController.isAdmin, userController.validateStore(), userController.storeUser);

router.put('/user/:id', authController.isAdmin, userController.validateUpdate(), userController.updateUser);

router.delete('/user/:id', authController.isAdmin, userController.deleteUser);

export default router;
