const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

// env constants
const { BCRYPT_SALT } = process.env;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        type: String
    }
},
{
    timestamps: true,
});

// hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const hash = await bcrypt.hash(this.password, Number(BCRYPT_SALT));
    this.password = hash;
    next();
});

// hash password before updating
userSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if (!update.$set || !update.$set.password) return next();
    
    const hash = await bcrypt.hash(update.$set.password, Number(BCRYPT_SALT));
    update.$set.password = hash;
    next();
});

module.exports = model('User', userSchema);