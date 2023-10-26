const express = require("express");
const router = express.Router();
const UserController = require("../controller/users.js");

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.post("/", UserController.createNewUser);
router.patch("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser)

module.exports = router;
