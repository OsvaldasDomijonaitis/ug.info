import express from "express";
var router = express.Router();

import UserAPIController from "../controllers/UserAPIController";

// const { isAuth, isAdmin } = require("../passport");

// vartotojų sąrašas
router.get("/", UserAPIController.index);
// router.get("/", isAdmin, UserAPIController.index);

// vartotojo informacija
router.get("/:id", UserAPIController.show);
// router.get("/:id", isAuth, UserAPIController.show);

// sukūrimo apdorojimas
router.post("/", UserAPIController.validateStore(), UserAPIController.store);
// router.post("/", isAdmin, UserAPIController.validateStore(), UserAPIController.store);

// redagavimo apdorojimas
router.put(
  "/:id/",
  UserAPIController.validateUpdate(),
  UserAPIController.update
);
// router.put(
//   "/:id/",
//   isAdmin,
//   UserAPIController.validateUpdate(),
//   UserAPIController.update
// );

// kliento trynimo adresas
router.delete("/:id/", UserAPIController.destroy);
// router.delete("/:id/", isAdmin, UserAPIController.destroy);

export default router;
