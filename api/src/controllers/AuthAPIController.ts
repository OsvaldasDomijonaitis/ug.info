import { Request, Response, NextFunction } from 'express';
import { body, validationResult, matchedData } from 'express-validator';

import bcrypt from 'bcrypt';

import { User } from './../../node_modules/.prisma/client/index.d';
import prismaDb from '../app';

type userNoPassword = Partial<User>;

import jwt from 'jsonwebtoken';
import passport from '../passport';

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET ?? '';

// -- // -- // -- // -- //

async function login (req: Request, res: Response) {
  const validation = validationResult(req);

  if (!validation.isEmpty()) {
    res.status(400).json(validation.array());

    return;
  };

  //

  const reqData = matchedData(req);

  const user = await prismaDb.user.findFirst(
    {
      where: { email: reqData.email },
    }
  );

  if (!user) {
    res.status(401).json('Neteisingi prisijungimo duomenys');

    return;
  };

  //

  if (!await bcrypt.compare(reqData.password, user.password)) {

    res.status(401).json('Neteisingi prisijungimo duomenys');
    return;
  };

  const token = jwt.sign(
    {
      userId: user.id
    },
    JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );

  const userData: userNoPassword = { ...user };
  delete userData.password;

  res.status(200).json(
    {
      message: 'Prisijungta prie sistemos',
      user: userData,
      token
    }
  );
};

async function auth(req: Request, res: Response, next: NextFunction, admin: boolean) {
  passport.authenticate(
    'jwt',
    {
      session: false
    },
    function (_: unknown, user: User) {
      if (user && (admin ? user.role === 2 : true)) {

        req.user = user;

        return next();
      };

      res.status(401).json('Neautorizuota');
    }
  )(req, res, next);
};

const isAuth = (req: Request, res: Response, next: NextFunction) => auth(req, res, next, false);

const isAdmin = (req: Request, res: Response, next: NextFunction) => auth(req, res, next, true);

// -- // -- // -- // -- //

const validateLogin = () => {
  return [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('El. pašto adresas yra privalomas')
      .escape()
      .isEmail()
      .withMessage('Neteisingas vartotojo el. pašto adresas'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Slaptažodis yra privalomas')
      .escape(),
  ];
};

// -- // -- // -- // -- //

export default {
  login,
  isAuth,
  isAdmin,

  validateLogin
};
