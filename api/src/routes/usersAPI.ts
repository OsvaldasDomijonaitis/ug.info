import express from "express";
var router = express.Router();

import Auth from "../controllers/AuthAPIController";
import UserAPIController from "../controllers/UserAPIController";

// const { isAuth, isAdmin } = require("../passport");

// vartotojų sąrašas
router.get("/", Auth.isAdmin, UserAPIController.index);

// vartotojo informacija
router.get("/:id", Auth.isAuth, UserAPIController.show);

// sukūrimo apdorojimas
router.post("/", Auth.isAdmin, UserAPIController.validateStore(), UserAPIController.store);

// redagavimo apdorojimas
router.put(
  "/:id/",
  Auth.isAdmin,
  UserAPIController.validateUpdate(),
  UserAPIController.update
);

// kliento trynimo adresas
router.delete("/:id/", Auth.isAdmin, UserAPIController.destroy);

export default router;
