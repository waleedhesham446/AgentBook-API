const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation Error', errors: errors.array() });
    }

    next();
}