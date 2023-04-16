const express = require('express');

// middlewares
const auth = require('../middlewares/auth');

// controllers
const { create, list } = require('../controllers/cards');

// validators
const { createValidator } = require('../validators/card');
const validate = require('../validators/validate');

const router = express.Router();

router.get('/list', auth, list);
router.post('/create', auth, createValidator, validate, create);

module.exports = router;