import express from 'express';
import userRouter from './userAPI';
// import eventRouter from './eventAPI';
// import rateRouter from './rateAPI';
// import postRouter from './postAPI';
// import messageRouter from './messageAPI';
// import tagRouter from './tagAPI';

const router = express.Router();

// -- // -- // -- // -- //

router.use('/users/', userRouter);
// router.use('/events/', eventRouter);
// router.use('/rates/', rateRouter);
// router.use('/posts/', postRouter);
// router.use('/messages/', messageRouter);
// router.use('/tags/', tagRouter);

export default router;

// -- // -- // -- // -- //

// USERS

// GET: /users, /users/:id
// POST: /users
// PUT: /users/:id
// DELETE: /users/:id
