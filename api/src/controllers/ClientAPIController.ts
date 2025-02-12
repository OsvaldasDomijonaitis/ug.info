import { Client } from './../../node_modules/.prisma/client/index.d';
import { body, validationResult, matchedData } from "express-validator";
import fs from "fs/promises";
import {prisma} from "../app";
import { Request, Response, NextFunction } from "express";


/**
 * CRUD resurso valdymas
 * CREATE
 * store()    - /api/v1/clients/           - POST      - sukuria naują klientą
 * READ
 * index()    - /api/v1/clients/           - GET       - visų klientų sąrašas
 * show(id)   - /api/v1/clients/:id        - GET       - vieno kliento informacija
 * UPDATE
 * update(id) - /api/v1/clients/:id        - PUT/PATCH - vieno kliento duomenų atnaujinimas
 * DELETE
 * destroy(id)- /api/v1/clients/:id        - DELETE    - vieno kliento ištrynimas
 */

// failų įkėlimo funkcija
interface UploadedFile {
  fieldname: string;
  mimetype: "image/webp" | "image/png" | "image/jpeg";
  path: string;
}

const moveUploadedFile = async (files: UploadedFile[], field: string, destination: string) => {
  let file = null;
  for (file of files) {
    if (file.fieldname == field ) {
      break;
    }
    file = null;
  }
  if (!file) {
    return null;
  }

  const ext = {"image/webp": ".webp", "image/png": ".png", "image/jpeg": ".jpg"};
  let file_name = destination + ext[file.mimetype as keyof typeof ext];
  
  await fs.rename(file.path, "./public" + file_name);
  
  return file_name;
}

// klientų sąrašo valdiklis (kontroleris)
const index = async function (req: Request, res: Response, next: NextFunction) {
  // gaumane visus klientus iš modelio
  const clients = await prisma.client.findMany();

  // išsiunčiame json pavidalu
  res.json(clients);
};

// kliento informacijos kontroleris
const show = async (req: Request, res: Response | any, next: NextFunction) => {
  // gauname klientą pagal link'ą
  const client = await prisma.client.findFirst({
    where: { link: req.params.clientLink },
  }); 

  // jei vartotojo nerado
  if (!client) {
    return res.status(404).json({
      error: { status: 404, messages: "Klientas neegzistuoja" },
    });
  }

  // išsiunčiame json pavidalu
  res.json(client);
};

const validateStore = () => [
  body("name")
    .trim()
    .notEmpty()
    .escape()
    .withMessage("Kliento vardas yra privalomas"),
  body("link").trim().notEmpty().escape().withMessage("Nuoroda yra privaloma"),
  body("description")
    .trim()
    .notEmpty()
    .escape()
    .withMessage("Aprašymas yra privalomas"),
  body("img").trim().optional().escape(),
];

const store = async (req: Request | any, res: Response | any, next: NextFunction) => {
  // iš užklausos surenkame ir validuojame duomenis
  const validation = validationResult(req);

  // klaidos validuojant duomenis
  if (!validation.isEmpty()) {
    return res.status(400).json({
      error: { status: 400, messages: validation.array() },
    });
  }

  // gauname validuotus duomenis
  const data: Client = matchedData(req);

  // tikriname ar laisvas linkas
  let client = await prisma.client.findFirst({
    where: { link: data.link },
  });

  if (client) {
    // linkas jau egzistuoja
    return res.status(400).json({
      error: { status: 400, messages: "Tokis kliento nuoroda jau egzistuoja" },
    });
  }

  // siunčiame į DB per modelį
  client = await prisma.client.create({ data });

  if (!client) {
    // nepavyko įterpti
    return res.status(500).json({
      error: { status: 500, messages: "Serverio klaida" },
    });
  }

  // Jei pavyko sukurti klientą, tik tada keliame nuotrauką, nes pavadinimui naudosime id
  // galima kelti ir sukūrimo metu, jei pavadinime nenaudotume kliento id

  // vykdome failo įkėlimą
  if (req.files) {
    let file_name = await moveUploadedFile(req.files, "img", "/images/clients/client_img_"+client.id);
    if (file_name) {
      await prisma.client.update({where: {id: client.id}, data: {img: file_name}});
    }
  }

  return res.status(201).json({
    status: "success",
    id: client.id,
    messages: "Sukurtas naujas klientas",
  });
};

const validateUpdate = () => [
  body("name")
    .trim()
    .notEmpty()
    .escape()
    .withMessage("Kliento vardas yra privalomas"),
  body("link").trim().notEmpty().escape().withMessage("Nuoroda yra privaloma"),
  body("description")
    .trim()
    .notEmpty()
    .escape()
    .withMessage("Aprašymas yra privalomas"),
  body("img").trim().optional().escape(),
];

// kliento informacijos keitimo formos apdorojimo kontroleris
const update = async (req: Request | any, res: Response | any, next: NextFunction) => {
  let client = await prisma.client.findFirst({
    where: { link: req.params.clientLink },
  });

  // jei kliento nėra DB
  if (!client) {
    return res.status(404).json({
      error: { status: 404, messages: "Kliento nėra" },
    });
  }

  // validacija
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

  // tikriname link'ą
  const client_for_link = await prisma.client.findFirst({
    where: { link: data.link },
  });

  if (client_for_link && client_for_link.link != req.params.clientLink) {
    return res.status(400).json({
      error: { status: 400, messages: "Tokia kliento nuoroda jau egzistuoja" },
    });
  }

  // vykdome failo įkėlimą jei yra
  if (req.files) {
    let file_name = await moveUploadedFile(req.files, "img", "/images/clients/client_img_"+client.id);
    if (file_name) {
      data.img = file_name;
    }
  }

  // siunčiame į DB per modelį
  client = await prisma.client.update({
    where: { id: client.id },
    data,
  });

  if (!client) {
    return res.status(500).json({
      error: { status: 500, messages: "Serverio klaida" },
    });
  }

  return res.status(200).json({
    status: "success",
    messages: "Kliento duomenys atnaujinti sėkmingai",
  });
};

// kliento trynimo kontroleris
const destroy = async (req: Request, res: Response | any, next: NextFunction) => {
  const client = await prisma.client.findFirst({
    where: { link: req.params.clientLink },
  }); 

  // jei kliento nėra DB
  if (!client) {
    return res.status(404).json({
      error: { status: 404, messages: "Kliento nėra" },
    });
  }

  const result = await prisma.client.delete({
    where: { id: client.id },
  });

  if (!result) {
    return res.status(500).json({
      error: { status: 500, messages: "Serverio klaida" },
    });
  }

  // todo: ištrinti kliento nuotrauką

  return res.status(200).json({
    status: "success",
    messages: "Klientas ištrintas",
  });
};

export default { index, show, store, update, destroy, validateStore, validateUpdate };