import express from 'express';
import authController from '../controllers/AuthAPIController';
import userController from '../controllers/UserAPIController';

const router = express.Router();

// -- // -- // -- // -- //

router.get('/all', authController.isAdmin, userController.getAllUsers);

router.get('/:id', authController.isAuth, userController.getUser);

router.post('/all', authController.isAdmin, userController.validateStore(), userController.storeUser);

router.put('/:id', authController.isAdmin, userController.validateUpdate(), userController.updateUser);

router.delete('/:id', authController.isAdmin, userController.deleteUser);

export default router;
