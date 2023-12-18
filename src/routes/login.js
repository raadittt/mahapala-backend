const express = require("express");
const router = express.Router();
const loginController = require("../controller/loginController.js");
const cors = require('cors');
const corsOptions = require('../config/cors.js');

router.post("/", cors(corsOptions), loginController.getUserLoginByNPM);

module.exports = router;