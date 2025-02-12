const ClientModel = require("../models/ClientModel");
const { body, validationResult, matchedData } = require("express-validator");
const fs = require("fs/promises");

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
const moveUploadedFile = async (files, field, destination) => {
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
  let file_name = destination + ext[file.mimetype];
  // console.log(file_name);
  // console.log(file.path);
  
  await fs.rename(file.path, "./public" + file_name);
  
  return file_name;
}

// klientų sąrašo valdiklis (kontroleris)
module.exports.index = async function (req, res, next) {
  // gaumane visus klientus iš modelio
  const clients = await ClientModel.getAll();

  // išsiunčiame json pavidalu
  res.json(clients);
};

// kliento informacijos kontroleris
module.exports.show = async (req, res, next) => {
  // gauname klientą pagal link'ą
  const client = await ClientModel.getByLink(req.params.clientLink);

  // jei vartotojo nerado
  if (!client) {
    return res.status(404).json({
      error: { status: 404, messages: "Klientas neegzistuoja" },
    });
  }

  // išsiunčiame json pavidalu
  res.json(client);
};

module.exports.validateStore = () => [
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

module.exports.store = async (req, res, next) => {
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

  // tikriname ar laisvas linkas
  const client = await ClientModel.getByLink(data.link);

  if (client) {
    // linkas jau egzistuoja
    return res.status(400).json({
      error: { status: 400, messages: "Tokis kliento nuoroda jau egzistuoja" },
    });
  }

  // siunčiame į DB per modelį
  const result = await ClientModel.insert(data);

  if (!result) {
    // nepavyko įterpti
    return res.status(500).json({
      error: { status: 500, messages: "Serverio klaida" },
    });
  }

  // Jei pavyko sukurti klientą, tik tada keliame nuotrauką, nes pavadinimui naudosime id
  // galima kelti ir sukūrimo metu, jei pavadinime nenaudotume kliento id

  // vykdome failo įkėlimą
  if (req.files) {
    let file_name = await moveUploadedFile(req.files, "img", "/images/clients/client_img_"+result);
    if (file_name) {
      await ClientModel.update({img: file_name}, result);
    }
  }

  return res.status(201).json({
    status: "success",
    id: result,
    messages: "Sukurtas naujas klientas",
  });
};

module.exports.validateUpdate = () => [
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
module.exports.update = async (req, res, next) => {
  const client = await ClientModel.getByLink(req.params.clientLink);

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
      error: { status: 400, messages: validation.errors },
    });
  }

  // gauname validuotus duomenis
  const data = matchedData(req);

  // tikriname link'ą
  const client_for_link = await ClientModel.getByLink(data.link);

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
  const result = await ClientModel.update(data, client.id);

  if (!result) {
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
module.exports.destroy = async (req, res, next) => {
  const client = await ClientModel.getByLink(req.params.clientLink);

  // jei kliento nėra DB
  if (!client) {
    return res.status(404).json({
      error: { status: 404, messages: "Kliento nėra" },
    });
  }

  const result = await ClientModel.delete(client.id);

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
