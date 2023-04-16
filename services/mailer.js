const nodeoutlook = require('nodejs-nodemailer-outlook');
const ejs = require("ejs");

// env constants
const { EMAIL_NAME, EMAIL_PASSWORD, CLIENT_BASE_URL } = process.env;

/**
 * sends email to a user
 * @param {*} receiver email address of the receiver
 * @param {*} subject subject of the email
 * @param {*} template template of the email
 */
const sendEmail = (receiver, subject, template, resolve, reject) => {
    nodeoutlook.sendEmail({
        auth: {
            user: EMAIL_NAME,
            pass: EMAIL_PASSWORD
        },
        from: EMAIL_NAME,
        to: receiver,
        subject: subject,
        html: template,
        onError: (e) => {
            console.log(e);
            reject(e);
        },
        onSuccess: (i) => {
            resolve(i);
        }
    });
}

/**
 * Sends email to the user with the reset password link
 * @param {*} email email address of the user
 * @param {*} username username of the user
 * @param {*} userId mongoDB id of the user
 * @param {*} resetToken reset token generated for the user
 * @returns promise that will resolve if email is sent successfully
 */
exports.forgotPassword = (email, username, userId, resetToken) => {
    return new Promise(async (resolve, reject) => {
        if (!email) reject('Invalid empty email');

        const resetLink = `${CLIENT_BASE_URL}/passwordReset?token=${resetToken}&id=${userId}`;
        
        const htmlFile = await ejs.renderFile(__dirname + "/../views/forgot-password.ejs", { email, username, resetLink });
    
        sendEmail(email, 'Forgot Password', htmlFile, resolve, reject);
    });
}

/**
 * Sends email to the user after successful password reset
 * @param {*} email email address of the user
 * @param {*} username username of the user
 * @returns promise that will resolve if email is sent successfully
 */
exports.passwordReset = (email, username) => {
    return new Promise(async (resolve, reject) => {
        if (!email) reject('Invalid empty email');

        const htmlFile = await ejs.renderFile(__dirname + "/../views/success-password-reset.ejs", { email, username });
    
        sendEmail(email, 'Successful Password Reset', htmlFile, resolve, reject);
    });
}