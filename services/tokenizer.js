const bcrypt = require('bcryptjs');
const crypto = require("crypto");

// models
const ResetPasswordToken = require('../models/ResetPasswordToken');

// env constants
const { BCRYPT_SALT } = process.env;

/**
 * Create a reset password token for a user
 * @param {*} userId mongoDB user id
 * @returns the reset password token
 */
exports.resetPasswordToken = async (userId) => {
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(resetToken, Number(BCRYPT_SALT));

    // remove all previous reset password tokens for this user
    await ResetPasswordToken.deleteMany({ userId });

    await new ResetPasswordToken({
        userId: userId,
        token: hashedToken,
        createdAt: Date.now(),
    }).save();

    return resetToken;
}