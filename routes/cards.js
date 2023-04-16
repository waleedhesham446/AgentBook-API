const express = require('express');

// middlewares
const auth = require('../middlewares/auth');

// controllers
const { create, list } = require('../controllers/cards');

const router = express.Router();

router.get('/list', auth, list);
router.post('/create', auth, create);

module.exports = router;