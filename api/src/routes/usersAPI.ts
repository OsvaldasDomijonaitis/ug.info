import express from "express";
var router = express.Router();

import Auth from "../controllers/AuthAPIController";
import UserAPIController from "../controllers/UserAPIController";

// const { isAuth, isAdmin } = require("../passport");

// vartotojų sąrašas
router.get("/user/all", Auth.isAdmin, UserAPIController.getAllUsers);

// vartotojo informacija
router.get("/user/:id", Auth.isAuth, UserAPIController.getOneUser);

// sukūrimo apdorojimas
router.post("/", Auth.isAdmin, UserAPIController.validateStore(), UserAPIController.store);

export default router;
