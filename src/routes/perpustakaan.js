const express = require("express");
const multer = require("multer");
const router = express.Router();
const PerpustakaanController = require("../controller/perpustakaan.js");

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
router.get("/", PerpustakaanController.getAllPerpustakaan);
router.get("/:id", PerpustakaanController.getPerpustakaanById);
router.post("/", upload.single("berkas"), PerpustakaanController.createNewPerpustakaan);
router.patch("/:id", upload.single("berkas"), PerpustakaanController.updatePerpustakaan);
router.delete("/:id", PerpustakaanController.deletePerpustakaan);

module.exports = router;
