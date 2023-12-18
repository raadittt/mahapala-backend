const express = require("express");
const multer = require("multer");
const router = express.Router();
const BannerController = require("../controller/banner.js");
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

router.get("/", cors(corsOptions), BannerController.getAllBanner);
router.get("/:id", cors(corsOptions), BannerController.getBannerById);
router.post("/", cors(corsOptions), upload.single("gambar"), BannerController.createNewBanner);
router.patch("/:id", cors(corsOptions), upload.single("gambar"), BannerController.updateBanner);
router.delete("/:id", cors(corsOptions), BannerController.deleteBanner)

module.exports = router;
