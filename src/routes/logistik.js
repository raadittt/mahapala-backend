const express = require('express');
const router = express.Router();
const LogistikController = require('../controller/logistik.js');
const cors = require('cors');
const corsOptions = require('../config/cors.js');

// Apply CORS middleware for specific routes
router.get("/", cors(corsOptions), LogistikController.getAllLogistik);
router.get("/:id", cors(corsOptions), LogistikController.getLogistikById);
router.post("/", cors(corsOptions), LogistikController.createNewLogistik);
router.patch("/:id", cors(corsOptions), LogistikController.updateLogistik);
router.delete("/:id", cors(corsOptions), LogistikController.deleteLogistik);

module.exports = router;

