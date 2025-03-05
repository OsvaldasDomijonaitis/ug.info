import express from "express";
const router = express.Router();

// import clientsAPIRouter from "./clientsAPI";
import usersAPIRouter from "./userAPI";

// router.use("/clients", clientsAPIRouter);
router.use("/users", usersAPIRouter);

export default router;
