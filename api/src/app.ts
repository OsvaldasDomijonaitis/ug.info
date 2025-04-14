import 'dotenv/config';
import path from 'path';

import express from 'express';
import authRouter from './routes/authAPI';
import apiV1Router from './routes/api_v1';

const app = express();

import { PrismaClient } from '@prisma/client';

const prismaDb = new PrismaClient();

// -- // -- // -- // -- //

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);
app.use('/api/v1/', apiV1Router);

app.listen(3000); // process.env.SERVER_PORT ?

export default prismaDb;
