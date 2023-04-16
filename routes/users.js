const express = require('express');

// controllers
const { signup, login, forgotPassword, resetPassword } = require('../controllers/users');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.put('/forgot-password', forgotPassword);
router.put('/reset-password', resetPassword);

module.exports = router;