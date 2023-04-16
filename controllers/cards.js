// models
const Card = require('../models/Card');
const User = require('../models/User');

exports.list = async (req, res) => {

    try {
        const { page, limit } = req.query;      //  for pagination
        const cards = await Card.find().skip((page - 1) * limit).limit(limit);
        
        return res.status(200).json({ cards });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

exports.create = async (req, res) => {
    
    try {
        const { userId } = req;     //  from the middleware auth
        const { title, description, assignees, category } = req.body;

        const existUser = await User.findById(userId);
        if (!existUser) return res.status(400).json({ message: 'User not found' });

        const newCard = await Card.create({ title, description, assignees, category, createdBy: userId });

        return res.status(200).json({ card: newCard, message: 'Card created successfully' });
    } catch (error) {
        
    }
}