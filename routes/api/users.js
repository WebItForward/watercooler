const express = require("express");
const router = express.Router();
const userCtrl = require("../../controllers/api/users");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/", userCtrl.createUser);

router.post("/login", userCtrl.loginUser);

router.get("/check-token", ensureLoggedIn, userCtrl.checkToken);

router.get("/:id", ensureLoggedIn, userCtrl.getUserById);

module.exports = router;
