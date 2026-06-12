const express = require('express');
const router = express.Router();
const { getUserProfile, updateProfileScreen } = require('../controllers/user.controller');
const { requireAuth } = require('../middleware/auth');

router.get('/profile', getUserProfile);
router.patch('/profile', updateProfileScreen);

module.exports = router;