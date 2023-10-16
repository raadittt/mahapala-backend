const express = require("express");
const router = express.Router();
const LogistikController = require("../controller/logistik.js");

router.get("/", LogistikController.getAllLogistik);
router.post("/", LogistikController.createNewLogistik);
router.patch("/:id", LogistikController.updateLogistik);
router.delete("/:id", LogistikController.deleteLogistik)

module.exports = router;
