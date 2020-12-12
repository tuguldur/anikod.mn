const express = require("express");
const router = express.Router();
const proxy = require("../controllers/proxy");
/**
 * /api/proxy/:
 */
router.get("/stream/:id/:number/:resolution", proxy.stream);

module.exports = router;
