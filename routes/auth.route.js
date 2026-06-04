const express = require('express');
const router = express.Router();

const { register, login, getAllUsers } = require('../controllers/auth.controller');

const { validateRegisterInput, validateLoginInput } = require('../middleware/validator');

router.post('/register', validateRegisterInput, register);

router.post('/login', validateLoginInput, login);

router.get('/users', getAllUsers);

module.exports = router;