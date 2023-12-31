const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const PerpustakaanController = require("../controller/perpustakaan.js");
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const corsOptions = require('../config/cors.js');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dvkzpnpgj',
  api_key: '261859215443568',
  api_secret: 'Jvbuo2YRzDNmPY7FMailqTNzlc4',
});

// Configure Cloudinary as storage engine for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Specify the folder in Cloudinary where you want to store the files
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'pdf'], // Specify the allowed file formats
    public_id: (req, file) => `perpustakaan_${Date.now()}_${file.originalname}`, // Generate a unique public_id for each file
  },
});

// Create a Multer instance with the Cloudinary storage engine
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", cors(corsOptions), PerpustakaanController.getAllPerpustakaan);
router.get("/:id", cors(corsOptions), PerpustakaanController.getPerpustakaanById);
router.post("/", cors(corsOptions), upload.single("berkas"), PerpustakaanController.createNewPerpustakaan);
router.patch("/:id", cors(corsOptions), upload.single("berkas"), PerpustakaanController.updatePerpustakaan);
router.delete("/:id", cors(corsOptions), PerpustakaanController.deletePerpustakaan);

module.exports = router;
