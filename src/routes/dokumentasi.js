const express = require("express");
const router = express.Router();
const DokumentasiController = require("../controller/dokumentasi.js");

router.get("/", DokumentasiController.getAllDokumentasi);
router.post("/", DokumentasiController.createNewDokumentasi);
router.patch("/:id", DokumentasiController.updateDokumentasi);
router.delete("/:id", DokumentasiController.deleteDokumentasi);

module.exports = router;
