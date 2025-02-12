var express = require("express");
var router = express.Router();

var clientsAPIRouter = require("./clientsAPI");
var usersAPIRouter = require("./usersAPI");

router.use("/clients", clientsAPIRouter);
router.use("/users", usersAPIRouter);

module.exports = router;
