const express = require("express");
const multer = require("multer");
const router = express.Router();
const BeritaController = require("../controller/berita.js");

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

router.get("/", BeritaController.getAllBerita);
router.get("/:id", BeritaController.getBeritaById);
router.post("/", upload.single("gambar"), BeritaController.createNewBerita);
router.patch("/:id", upload.single("gambar"), BeritaController.updateBerita);
router.delete("/:id", BeritaController.deleteBerita)

module.exports = router;
