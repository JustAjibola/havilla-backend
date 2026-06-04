
const { getUserProfile, updateProfileScreen } = require('../controllers/user.controller');
const { requireAuth } = require('../middleware/auth.middleware');


router.get('/profile', requireAuth, getUserProfile);

router.patch('/profile', requireAuth, updateProfileScreen);