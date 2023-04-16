const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');

// database connection
const dbConnection = require('./db');

// routers
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

// cofigurations
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/card', cardRouter);

const PORT = process.env.PORT || 3000;
dbConnection()
    .then(() => {
        console.log("Connected to database...");
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}...`));
    })
    .catch((error) => console.log(error.message));