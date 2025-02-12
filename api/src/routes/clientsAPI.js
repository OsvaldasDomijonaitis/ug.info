var express = require("express");
var router = express.Router();
const ClientAPIController = require("../controllers/ClientAPIController");
const { isAuth, isAdmin } = require("../passport");

router.get("/", isAuth, ClientAPIController.index);

// sukūrimo formos apdorojimas
router.post(
  "/",
  isAuth,
  ClientAPIController.validateStore(),
  ClientAPIController.store
);

// klientų puslapiai imami pagal parametrą iš objekto
router.get("/:clientLink", isAuth, ClientAPIController.show);

// redagavimo apdorojimas
router.put(
  "/:clientLink/",
  isAuth,
  ClientAPIController.validateUpdate(),
  ClientAPIController.update
);

// kliento trynimo adresas
router.delete("/:clientLink/", isAuth, ClientAPIController.destroy);

module.exports = router;
