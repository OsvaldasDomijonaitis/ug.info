import express from "express";
var router = express.Router();

import { body } from "express-validator";

import AuthAPIController from "../controllers/AuthAPIController";
// const UserAPIController = require("../controllers/UserAPIController");

router.post(
  "/login",
  [
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
  ],
  AuthAPIController.login
);

// router.post("/register", UserAPIController.validateStore(), UserAPIController.store);

export default router;
