const express = require("express");
const router = express.Router();
const BannerController = require("../controller/banner.js");

router.get("/", BannerController.getAllBanner);
router.post("/", BannerController.createNewBanner);
router.patch("/:id", BannerController.updateBanner);
router.delete("/:id", BannerController.deleteBanner)

module.exports = router;
