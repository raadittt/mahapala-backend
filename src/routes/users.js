const express = require("express");
const router = express.Router();
const UserController = require("../controller/users.js");
const cors = require('cors');
const corsOptions = require('../config/cors.js');

router.get("/", cors(corsOptions), UserController.getAllUsers);
router.get("/:id", cors(corsOptions), UserController.getUserById);
router.post("/", cors(corsOptions), UserController.createNewUser);
router.patch("/:id", cors(corsOptions), UserController.updateUser);
router.delete("/:id", cors(corsOptions), UserController.deleteUser)

module.exports = router;
