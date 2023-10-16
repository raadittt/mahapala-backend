const express = require("express");
const router = express.Router();
const DivisiController = require("../controller/divisi.js");

router.get("/", DivisiController.getAllDivisi);
router.post("/", DivisiController.createNewDivisi);
router.patch("/:id", DivisiController.updateDivisi);
router.delete("/:id", DivisiController.deleteDivisi)

module.exports = router;
