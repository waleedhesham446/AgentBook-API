const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// models
const User = require('../models/User');
const ResetPasswordToken = require('../models/ResetPasswordToken');

// services
const { forgotPassword: forgotPasswordMail, passwordReset: passwordResetMail } = require('../services/mailer');
const { resetPasswordToken } = require('../services/tokenizer');

// env constants
const { JWT_SECRET } = process.env;

exports.signup = async (req, res) => {

    try {
        const { email, password, name, picture } = req.body;
    
        const existUser = await User.findOne({ email });
        if (existUser) return res.status(400).json({ message: 'This email is already registered' });
    
        // password hashing is done in the model pre save hook
        let newUser = await User.create({ email, password, name, picture });
    
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, JWT_SECRET, { expiresIn: '5d' });
    
        // delete password from newUser object to be returned to client
        newUser = newUser.toObject();
        delete newUser.password;
    
        return res.status(200).json({ token, user: newUser, message: 'Successful Signup' });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

exports.login = async (req, res) => {
    
    try {
        const { email, password } = req.body;
    
        let existUser = await User.findOne({ email });
        if (!existUser) return res.status(400).json({ message: 'This email is not registered' });
    
        const isPasswordCorrect = await bcrypt.compare(password, existUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid email or password' });
    
        const token = jwt.sign({ email: existUser.email, id: existUser._id }, JWT_SECRET, { expiresIn: '5d' });
    
        // delete password from existUser object
        existUser = existUser.toObject();
        delete existUser.password;
    
        return res.status(200).json({ token, user: existUser, message: 'Successful Login' });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

exports.forgotPassword = async (req, res) => {

    try {
        const { email } = req.body;
    
        const user = await User.findOne({ email }).select('name');
        if (!user) return res.status(400).json({ message: 'This email is not registered' });
        
        // generate reset token
        const resetToken = await resetPasswordToken(user._id);
        // send email
        await forgotPasswordMail(email, user.name, user._id, resetToken);
    
        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

exports.resetPassword = async (req, res) => {

    try {
        const { userId, token, password } = req.body;
        
        const passwordResetToken = await ResetPasswordToken.findOne({ userId });
        if (!passwordResetToken) return res.status(400).json({ message: 'Invalid or expired password reset token' });

        const isValid = await bcrypt.compare(token, passwordResetToken.token);
        if (!isValid) return res.status(400).json({ message: 'Invalid or expired password reset token' });
        
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $set: { password } },
            { new: true }
        );
        await passwordResetToken.deleteOne();

        await passwordResetMail(user.email, user.name);

        return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
  };