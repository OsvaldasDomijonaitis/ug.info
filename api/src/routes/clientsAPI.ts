import express from "express";
var router = express.Router();

import ClientAPIController from "../controllers/ClientAPIController";
import Auth from "../controllers/AuthAPIController";

router.get("/", Auth.isAuth, ClientAPIController.index);

// sukūrimo formos apdorojimas
router.post(
  "/",
  Auth.isAuth,
  ClientAPIController.validateStore(),
  ClientAPIController.store
);

// klientų puslapiai imami pagal parametrą iš objekto
router.get("/:clientLink", Auth.isAuth, ClientAPIController.show);

// redagavimo apdorojimas
router.put(
  "/:clientLink/",
  Auth.isAuth,
  ClientAPIController.validateUpdate(),
  ClientAPIController.update
);

// kliento trynimo adresas
router.delete("/:clientLink/", Auth.isAuth, ClientAPIController.destroy);

export default router;
