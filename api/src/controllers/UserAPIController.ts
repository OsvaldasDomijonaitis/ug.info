import { Request, Response } from 'express';
import { body, validationResult, matchedData } from 'express-validator';

import bcrypt from 'bcrypt';

import { Prisma } from '@prisma/client';
import { prisma as db } from '../app';

// GET: /user/all, /user/:id
// POST: /user/all
// PUT: /user/:id
// DELETE: /user/:id

// -- // -- // -- // -- //

async function getAllUsers(_: unknown, res: Response) {
  try {
    const users = await db.user.findMany(
      {
        select: { password: false }
      }
    );

    res.status(200).json(users);
  } catch {
    res.status(500).json('Serverio klaida');
  };
};

async function getUser(req: Request, res: Response) {
  try {
    const user = await db.user.findFirst(
      {
        where: { id: Number(req.params.id) },
        select: { password: false }
      }
    );

    if (!user) {
      res.status(404).json('Vartotojas nerastas');

      return;
    };

    res.status(200).json(user);
  } catch {
    res.status(500).json('Serverio klaida');
  };
};

async function deleteUser(req: Request, res: Response) {
  try {
    const user = await db.user.findFirst(
      {
        where: { id: Number(req.params.id) }
      }
    );

    if (!user) {
      res.status(404).json('Vartotojas nerastas');
      
      return;
    };

    //

    const result = await db.user.delete(
      {
        where: { id: user.id }
      }
    );

    if (!result) {
      res.status(500).json('Serverio klaida');
      
      return;
    };

    res.status(200).json('Vartotojas ištrintas');
  } catch {
    res.status(500).json('Serverio klaida');
  };
};

async function updateUser(req: Request, res: Response) {
  try {
    const user = await db.user.findFirst(
      {
        where: { id: Number(req.params.id) }
      }
    );

    if (!user) {
      res.status(404).json('Vartotojas nerastas');
      
      return;
    };

    //

    const validation = validationResult(req);

    if (!validation.isEmpty()) {
      res.status(400).json(validation.array());

      return;
    };

    const data = matchedData(req);

    //

    const email = await db.user.findFirst(
      {
        where: { email: data.email },
      }
    );

    if (email && email.email !== user.email) {
      res.status(400).json('Toks el. pašto adresas jau egzistuoja');
      
      return;
    };

    if (data.password) data.password = await bcrypt.hash(data.password, 10);

    //

    const result = await db.user.update(
      {
        where: { id: user.id },
        data: data,
      }
    );

    if (!result) {
      res.status(500).json('Serverio klaida');
      
      return;
    };

    res.status(200).json('Vartotojas atnaujintas');
  } catch {
    res.status(500).json('Serverio klaida');
  };
};

async function storeUser(req: Request, res: Response) {
  try {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
      res.status(400).json(validation.array());
      
      return;
    };

    const reqData: Prisma.UserCreateInput = matchedData(req);

    //

    let user = await db.user.findFirst(
      {
        where: { email: reqData.email },
      }
    );

    if (user) {
      res.status(400).json('Toks el. pašto adresas jau egzistuoja');

      return;
    };

    reqData.password = await bcrypt.hash(reqData.password, 10);

    //

    user = await db.user.create({ data: reqData });

    if (!user) {
      res.status(500).json('Serverio klaida');

      return;
    };

    res.status(201).json(
      {
        message: 'Vartotojas sukurtas',
        id: user.id
      }
    );
  } catch {
    res.status(500).json('Serverio klaida');
  };
};

// -- // -- // -- // -- //

const validateStore = () => [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('El. pašto adresas privalomas')
    .escape()
    .isEmail()
    .withMessage('Neteisingas vartotojo el. pašto adresas'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Neteisingas slaptažodis')
    .escape()
];

const validateUpdate = () => [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('El. pašto adresas privalomas')
    .escape()
    .isEmail()
    .withMessage('Neteisingas vartotojo el. pašto adresas'),
  body('password').trim().optional().escape(),
  body('status')
    .trim()
    .escape()
    .isInt()
    .withMessage('Būsenos numeris privalomas'),
  body('role').trim().escape().isInt().withMessage('Rolės numeris privalomas')
];

// -- // -- // -- // -- //

export default {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  storeUser,

  validateStore,
  validateUpdate
};
