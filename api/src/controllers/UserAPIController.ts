import { Request, Response } from 'express';
import { body, validationResult, matchedData } from 'express-validator';

import bcrypt from 'bcrypt';

import { Prisma } from '@prisma/client';
import { prisma as db } from '../app';

/**
 * CRUD resurso valdymas
 * CREATE
 * store()    - /api/v1/users/           - POST      - sukuria naują vartotoją
 * READ
 * index()    - /api/v1/users/           - GET       - visų vartotojų sąrašas
 * show(id)   - /api/v1/users/:id        - GET       - vieno vartotojo informacija
 * UPDATE
 * update(id) - /api/v1/users/:id        - PUT/PATCH - vieno vartotojo duomenų atnaujinimas
 * DELETE
 * destroy(id)- /api/v1/users/:id        - DELETE    - vieno vartotojo ištrynimas
 */

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
    const user = await db.user.findUnique(
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
    const user = await db.user.findUnique(
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
    const user = await db.user.findUnique(
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

    const email = await db.user.findUnique(
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

    const data: Prisma.UserCreateInput = matchedData(req);

    //

    let user = await db.user.findUnique(
      {
        where: { email: data.email },
      }
    );

    if (user) {
      res.status(400).json('Toks el. pašto adresas jau egzistuoja');

      return;
    };

    data.password = await bcrypt.hash(data.password, 10);

    //

    user = await db.user.create({ data: data });

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
    .withMessage('Neteisingas vartotjo el. pašto adresas'),
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
    .withMessage('Neteisingas vartotjo el. pašto adresas'),
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
