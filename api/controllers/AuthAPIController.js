const UserModel = require("../models/UserModel");
const { body, validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Autentifikavimo kontrolerio valdymas
 * login()          - /login      - POST      - vartotojo prisijungimo apdorojimas
 */


module.exports.validateLogin = () => [
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

module.exports.login = async (req, res, next) => {
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

  // gauname vartotoją pagal el. paštą
  const user = await UserModel.getByEmail(data.email);

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
  const token = jwt.sign({ userid: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  delete user.password;

  // siunčiame vartotojui
  return res.status(200).json({
    status: "success",
    user,
    token,
    messages: "Prisijungta prie sistemos",
  });
};
