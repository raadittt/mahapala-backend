const express = require("express");
const router = express.Router();
const PerpustakaanController = require("../controller/perpustakaan.js");

router.get("/", PerpustakaanController.getAllPerpustakaan);
router.post("/", PerpustakaanController.createNewPerpustakaan);
router.patch("/:id", PerpustakaanController.updatePerpustakaan);
router.delete("/:id", PerpustakaanController.deletePerpustakaan);

module.exports = router;
