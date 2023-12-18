const express = require("express");
const multer = require("multer");
const router = express.Router();
const BeritaController = require("../controller/berita.js");
const cors = require('cors');
const corsOptions = require('../config/cors.js');

// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); // Specify the directory to save the uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname); // Use a unique filename
    },
});

// Create a Multer instance with the specified storage options
const upload = multer({ storage: storage });

router.get("/", cors(corsOptions), BeritaController.getAllBerita);
router.get("/:id", cors(corsOptions), BeritaController.getBeritaById);
router.post("/", cors(corsOptions), upload.single("gambar"), BeritaController.createNewBerita);
router.patch("/:id", cors(corsOptions), upload.single("gambar"), BeritaController.updateBerita);
router.delete("/:id", cors(corsOptions), BeritaController.deleteBerita)

module.exports = router;
