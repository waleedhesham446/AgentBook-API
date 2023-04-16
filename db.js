const mongoose = require("mongoose");
require('dotenv').config();

// env constants
const { DB_URL } = process.env;

module.exports = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
        });
    } catch (error) {
        console.log("Failed to connect to database!");
    }
};