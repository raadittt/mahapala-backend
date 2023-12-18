const express = require("express");
const router = express.Router();
const KategoriController = require("../controller/kategori.js");
const cors = require('cors');
const corsOptions = require('../config/cors.js');

router.get("/", cors(corsOptions),  KategoriController.getAllKategori);
router.post("/", cors(corsOptions), KategoriController.createNewKategori);
router.patch("/:id", cors(corsOptions), KategoriController.updateKategori);
router.delete("/:id", cors(corsOptions), KategoriController.deleteKategori)

module.exports = router;
