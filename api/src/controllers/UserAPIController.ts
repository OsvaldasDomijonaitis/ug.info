// const UserModel = require("../models/UserModel");
const { body, validationResult, matchedData } = require("express-validator");
import bcrypt from "bcrypt";

import { NextFunction, Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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

const fields = ["id", "email", "role", "status"];

// vartotojų sąrašo valdiklis (kontroleris)
const index = async function (req: Request, res: Response, next: NextFunction) {
  // gaumane visus vartotojus iš modelio
  const users = await prisma.user.findMany({
    omit: { password: true },
  });

  // Atiduodame duomenis JSON pavidalu
  res.json(users);
};

const show = async (req: Request, res: Response | any, next: NextFunction) => {
  const user = await prisma.user.findFirst({
    omit: { password: true },
    where: { id: Number(req.params.id) },
  });

  // jei vartotojo nerado
  if (!user) {
    return res.status(404).json({
      error: { status: 404, messages: "Vartotojas neegzistuoja" },
    });
  }

  // galima tik adminui arba tam pačiam varototjui
  // if (req.user.role != 2 && req.user.id != user.id) {
  //   return res.status(401).json({
  //     error: { status: 401, messages: "Unauthorized" },
  //   });
  // }

  // Atiduodame duomenis JSON pavidalu
  return res.json(user);
};

const validateStore = () => [
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
    .withMessage("Neteisingas slaptažodis")
    .escape(),
];

const store = async (req: Request, res: Response | any, next: NextFunction) => {
  // iš užklausos surenkame ir validuojame duomenis
  const validation = validationResult(req);

  // klaidos validuojant duomenis
  if (!validation.isEmpty()) {
    return res.status(400).json({
      error: { status: 400, messages: validation.errors },
    });
  }

  // gauname validuotus duomenis
  const data = matchedData(req);

  // tikriname ar laisvas el. paštas
  let user = await prisma.user.findFirst({
    where: { email: data.email },
  });

  if (user) {
    // el. paštas jau egzistuoja
    return res.status(400).json({
      error: { status: 400, messages: "Toks el. pašto adresas jau egzistuoja" },
    });
  }

  // šifruojame slaptažodį
  data.password = await bcrypt.hash(data.password, 10);

  // siunčiame į DB per modelį
  user = await prisma.user.create({ data });

  if (!user) {
    return res.status(500).json({
      error: { status: 500, messages: "Serverio klaida" },
    });
  }

  return res.status(201).json({
    status: "success",
    id: user.id,
    messages: "Sukurtas naujas vartotojas",
  });
};

const validateUpdate = () => [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El. pašto adresas privalomas")
    .escape()
    .isEmail()
    .withMessage("Neteisingas vartotjo el. pašto adresas"),
  body("password").trim().optional().escape(),
  body("status")
    .trim()
    .escape()
    .isInt()
    .withMessage("Būsenos numeris privalomas"),
  body("role").trim().escape().isInt().withMessage("Rolės numeris privalomas"),
];

// vartotojo informacijos keitimas
const update = async (req: Request, res: Response | any, next: NextFunction) => {
  const user = await prisma.user.findFirst({
    where: { id: Number(req.params.id) },
  });
  
  // jei vartotojo nėra DB
  if (!user) {
    return res.status(404).json({
      error: { status: 404, messages: "Vartotojo nėra" },
    });
  }

  // validacija
  // iš užklausos surenkame ir validuojame duomenis
  const validation = validationResult(req);

  // klaidos validuojant duomenis
  if (!validation.isEmpty()) {
    return res.status(400).json({
      error: { status: 400, messages: validation.errors },
    });
  }

  // gauname validuotus duomenis
  const data = matchedData(req);

  // tikriname el. paštą
  const user_for_email = await prisma.user.findFirst({
    where: { email: data.email },
  });
  
  if (user_for_email && user_for_email.email != user.email) {
    return res.status(400).json({
      error: { status: 400, messages: "Toks el. pašto adresas jau egzistuoja" },
    });
  }

  // slaptažodžių keitimas, jei gautas
  if (data.password) {
    // šifruojame slaptažodį
    data.password = await bcrypt.hash(data.password, 10);
  } else {
    // pašaliname slaptažodių parametrus, jei buvo tušti
    delete data.password;
  }

  // siunčiame į DB per modelį
  const result = await prisma.user.update({
    where: { id: user.id },
    data,
  });

  if (!result) {
    return res.status(500).json({
      error: { status: 500, messages: "Serverio klaida" },
    });
  }

  return res.status(200).json({
    status: "success",
    messages: "Atnaujinti vartotojo duomenys",
  });
};

// vartotojo trynimo kontroleris
const destroy = async (req: Request, res: Response | any, next: NextFunction) => {
  const user = await prisma.user.findFirst({
    where: { id: Number(req.params.id) },
  });
  
  // jei vartotojo nėra DB
  if (!user) {
    return res.status(404).json({
      error: { status: 404, messages: "Vartotojo nėra" },
    });
  }

  const result = await prisma.user.delete({
    where: { id: user.id },
  });
  
  if (!result) {
    return res.status(500).json({
      error: { status: 500, messages: "Serverio klaida" },
    });
  }

  return res.status(200).json({
    status: "success",
    messages: "Vartotojas ištrintas",
  });
};

export default {
  index,
  show,
  validateStore,
  store,
  validateUpdate,
  update,
  destroy,
};
