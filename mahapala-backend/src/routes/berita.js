const express = require("express");
const router = express.Router();
const BeritaController = require("../controller/berita.js");

router.get("/", BeritaController.getAllBerita);
router.post("/", BeritaController.createNewBerita);
router.patch("/:id", BeritaController.updateBerita);
router.delete("/:id", BeritaController.deleteBerita)

module.exports = router;
