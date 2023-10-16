const express = require("express");
const router = express.Router();
const KategoriController = require("../controller/kategori.js");

router.get("/", KategoriController.getAllKategori);
router.post("/", KategoriController.createNewKategori);
router.patch("/:id", KategoriController.updateKategori);
router.delete("/:id", KategoriController.deleteKategori)

module.exports = router;
