const express = require("express");
const router = express.Router();
const DivisiController = require("../controller/divisi.js");
const cors = require('cors');
const corsOptions = require('../config/cors.js');

router.get("/", cors(corsOptions), DivisiController.getAllDivisi);
router.post("/", cors(corsOptions), DivisiController.createNewDivisi);
router.patch("/:id", cors(corsOptions), DivisiController.updateDivisi);
router.delete("/:id", cors(corsOptions), DivisiController.deleteDivisi)

module.exports = router;
