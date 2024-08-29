const express = require('express');
const { handleGenerateNewShortURL, handleGetShortURL, handleGetAnalystics } = require("../controllers/url");

const router = express.Router();

router.post('/', handleGenerateNewShortURL);
router.get("/:shortId", handleGetShortURL);
router.get("/analytics/:shortId", handleGetAnalystics);

module.exports = router;