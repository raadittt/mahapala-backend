const express = require("express");
const multer = require("multer");
const router = express.Router();
const PerpustakaanController = require("../controller/perpustakaan.js");
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

// Define routes using the upload middleware
router.get("/", cors(corsOptions), PerpustakaanController.getAllPerpustakaan);
router.get("/:id", cors(corsOptions), PerpustakaanController.getPerpustakaanById);
router.post("/", cors(corsOptions), upload.single("berkas"), PerpustakaanController.createNewPerpustakaan);
router.patch("/:id", cors(corsOptions), upload.single("berkas"), PerpustakaanController.updatePerpustakaan);
router.delete("/:id", cors(corsOptions), PerpustakaanController.deletePerpustakaan);

module.exports = router;
