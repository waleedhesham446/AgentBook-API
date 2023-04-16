const { Schema, model } = require("mongoose");

const { ObjectId } = Schema.Types;

const tokenSchema = new Schema({
    userId: {
        type: ObjectId,
        required: true,
        ref: 'user',
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
});

module.exports = model("ResetPasswordToken", tokenSchema);