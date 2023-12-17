const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/login", userController.login);
router.get("/dashboard", userController.dashboard);

module.exports = router;
