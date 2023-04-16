const { checkSchema } = require('express-validator');

const create = {
    title: {
        notEmpty: {
            errorMessage: "Title is required.",
        },
    },
    description: {
        notEmpty: {
            errorMessage: "Description is required.",
        },
    },
}

exports.createValidator = checkSchema(create);