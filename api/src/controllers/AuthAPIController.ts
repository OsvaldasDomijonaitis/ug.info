import { User } from './../../node_modules/.prisma/client/index.d';
// const UserModel = require("../models/UserModel");
import { body, validationResult, matchedData } from "express-validator";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "../passport";

import { prisma } from "../app";

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || "";

type UserNoPassword = Partial<User>;

/**
 * Autentifikavimo kontrolerio valdymas
 * login()          - /login      - POST      - vartotojo prisijungimo apdorojimas
 */

const validateLogin = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("El. pašto adresas privalomas")
      .escape()
      .isEmail()
      .withMessage("Neteisingas vartotjo el. pašto adresas"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Slaptažodis yra privalomas")
      .escape(),
  ];
};

const login = async (
  req: Request,
  res: Response | any,
  next: NextFunction
): Promise<void> => {
  // iš užklausos surenkame ir validuojame duomenis
  const validation = validationResult(req);

  // klaidos validuojant duomenis
  if (!validation.isEmpty()) {
    return res.status(400).json({
      error: { status: 400, messages: validation.array() },
    });
  }

  // gauname validuotus duomenis
  const data = matchedData(req);

  // gauname vartotoją pagal el. paštą
  const user = await prisma.user.findFirst({
    where: { email: data.email },
  });

  if (!user) {
    return res.status(401).json({
      error: { status: 401, messages: "Neteisingi prisijungimo duomenys." },
    });
  }

  // tinkriname vartotojo slaptazodį
  const password_match = await bcrypt.compare(data.password, user.password);

  if (!password_match) {
    return res.status(401).json({
      error: { status: 401, messages: "Neteisingi prisijungimo duomenys." },
    });
  }

  // viskas OK
  // generuojamas JWT token'as 
  const token = jwt.sign({ userid: user.id }, JWT_SECRET, {
    expiresIn: "1h",
  });

  // išmetame slaptažodį
  const userdata: UserNoPassword = {...user};
  delete userdata.password;

  // siunčiame vartotojui
  return res.status(200).json({
    status: "success",
    user: userdata,
    token,
    messages: "Prisijungta prie sistemos",
  });
};

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, function (err: any, user: User, info: any) {
    if (user) {
      req.user = user;
      return next();
    }
    return res
      .status(401)
      .json({ error: { status: 401, message: "Unauthorized" } });
  })(req, res, next);
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, function (err: any, user: User, info: any) {
    if (user && user.role === 2) {
      req.user = user;
      return next();
    }
    return res
      .status(401)
      .json({ error: { status: 401, message: "Unauthorized" } });
  })(req, res, next);
};

export default { validateLogin, login, isAuth, isAdmin };
