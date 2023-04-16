const { checkSchema } = require('express-validator');

const signup = {
    email: {
        notEmpty: {
            errorMessage: "Email is required.",
        },
    },
    name: {
        notEmpty: {
            errorMessage: "Name is required.",
        },
    },
    password: {
        notEmpty: {
            errorMessage: "Password is required.",
        },
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password must be at least 8 characters long'
        }
    },
    confirmPassword: {
        custom: {
            options: (value, { req }) => value === req.body.password,
            errorMessage: 'Passwords must match'
        }
    },
}

const login = {
    email: {
        notEmpty: {
            errorMessage: "Email is required.",
        },
    },
    password: {
        notEmpty: {
            errorMessage: "Password is required.",
        },
    },
}

const forgotPassword = {
    email: {
        notEmpty: {
            errorMessage: "Email is required.",
        },
    },
}

const resetPassword = {
    userId: {
        notEmpty: {
            errorMessage: "UserId is required.",
        },
    },
    token: {
        notEmpty: {
            errorMessage: "Reset password token is required.",
        },
    },
    password: {
        notEmpty: {
            errorMessage: "Password is required.",
        },
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password must be at least 8 characters long'
        }
    },
    confirmPassword: {
        custom: {
            options: (value, { req }) => value === req.body.password,
            errorMessage: 'Passwords must match'
        }
    },
}

exports.signupValidator = checkSchema(signup);

exports.loginValidator = checkSchema(login);

exports.forgotPasswordValidator = checkSchema(forgotPassword);

exports.resetPasswordValidator = checkSchema(resetPassword);