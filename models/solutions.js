const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
    solution: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Solution', solutionSchema);