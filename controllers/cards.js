// models
const Card = require('../models/Card');

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
        if (!title || !description) return res.status(400).json({ message: 'Title and description are required' });

        const newCard = await Card.create({ title, description, assignees, category, createdBy: userId });

        return res.status(200).json({ card: newCard, message: 'Card created successfully' });
    } catch (error) {
        
    }
}