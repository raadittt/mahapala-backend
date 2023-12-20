const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const BeritaController = require("../controller/berita.js");
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
    public_id: (req, file) => `berita_${Date.now()}_${file.originalname}`, // Generate a unique public_id for each file
  },
});

// Create a Multer instance with the Cloudinary storage engine
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", cors(corsOptions), BeritaController.getAllBerita);
router.get("/:id", cors(corsOptions), BeritaController.getBeritaById);
router.post("/", cors(corsOptions), upload.single("berkas"), BeritaController.createNewBerita);
router.patch("/:id", cors(corsOptions), upload.single("berkas"), BeritaController.updateBerita);
router.delete("/:id", cors(corsOptions), BeritaController.deleteBerita);

module.exports = router;
