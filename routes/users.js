const express = require('express');

// controllers
const { signup, login, forgotPassword, resetPassword } = require('../controllers/users');

// validators
const { signupValidator, loginValidator, forgotPasswordValidator, resetPasswordValidator } = require('../validators/user');
const validate = require('../validators/validate');

const router = express.Router();

router.post('/signup', signupValidator, validate, signup);
router.post('/login', loginValidator, validate, login);
router.put('/forgot-password', forgotPasswordValidator, validate, forgotPassword);
router.put('/reset-password', resetPasswordValidator, validate, resetPassword);

module.exports = router;