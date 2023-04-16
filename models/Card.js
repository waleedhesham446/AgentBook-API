const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const cardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: ObjectId,
        ref: 'user',
        required: true,
    },
    assignees: {
        type: [ObjectId],
        required: true,
        ref: 'user',
        default: []
    },
    category: {
        type: String
    },
    status: {
        type: String,
        enum: ['To Do', 'In Process', 'In Review', 'Completed'],
        required: true,
        default: 'To Do'
    }
},
{
    timestamps: true,
});

module.exports = model('Card', cardSchema);