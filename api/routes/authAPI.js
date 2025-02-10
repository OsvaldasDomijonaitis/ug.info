var express = require("express");
var router = express.Router();
const AuthAPIController = require("../controllers/AuthAPIController");
const UserAPIController = require("../controllers/UserAPIController");

router.post("/login", AuthAPIController.validateLogin(), AuthAPIController.login);

router.post("/register", UserAPIController.validateStore(), UserAPIController.store);

module.exports = router;
