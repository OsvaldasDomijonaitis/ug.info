import express from "express";
const router = express.Router();

// var clientsAPIRouter = require("./clientsAPI");
import usersAPIRouter from "./usersAPI";

// router.use("/clients", clientsAPIRouter);
router.use("/users", usersAPIRouter);

export default router;
