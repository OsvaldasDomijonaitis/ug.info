var express = require("express");
var router = express.Router();
const UserAPIController = require("../controllers/UserAPIController");
const { isAuth, isAdmin } = require("../passport");

// vartotojų sąrašas
router.get("/", isAdmin, UserAPIController.index);

// vartotojo informacija
router.get("/:id", isAuth, UserAPIController.show);

// sukūrimo apdorojimas
router.post("/", isAdmin, UserAPIController.validateStore(), UserAPIController.store);

// redagavimo apdorojimas
router.put(
  "/:id/",
  isAdmin,
  UserAPIController.validateUpdate(),
  UserAPIController.update
);

// kliento trynimo adresas
router.delete("/:id/", isAdmin, UserAPIController.destroy);

module.exports = router;
