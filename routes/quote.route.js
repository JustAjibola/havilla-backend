const express = require('express');
const router = express.Router();
const { requestPlatformQuote } = require('../controllers/quote.controller');

router.post('/request', requestPlatformQuote);

module.exports = router;