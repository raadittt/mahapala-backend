const express = require("express");
const multer = require("multer");
const router = express.Router();
const DokumentasiController = require("../controller/dokumentasi.js");

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

router.get("/", DokumentasiController.getAllDokumentasi);
router.get("/:id", DokumentasiController.getDokumentasiById);
router.post("/", upload.single("berkas"), DokumentasiController.createNewDokumentasi);
router.patch("/:id", upload.single("berkas"), DokumentasiController.updateDokumentasi);
router.delete("/:id", DokumentasiController.deleteDokumentasi);

module.exports = router;
