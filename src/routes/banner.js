const express = require("express");
const multer = require("multer");
const router = express.Router();
const BannerController = require("../controller/banner.js");

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

router.get("/", BannerController.getAllBanner);
router.get("/:id", BannerController.getBannerById);
router.post("/", upload.single("gambar"), BannerController.createNewBanner);
router.patch("/:id", upload.single("gambar"), BannerController.updateBanner);
router.delete("/:id", BannerController.deleteBanner)

module.exports = router;
