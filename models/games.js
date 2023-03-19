const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
    ,
    description: {
        type: String,
        required: true,
    },
    pts: {
        type: Number,
        required: true,
    },
    codeBase: {
        type: String,
        required: true,
    },
    tester: {
        type: String,
        required: true,
    },
    testCases: {
        type: Array,
        required: true,
    }
})

module.exports = mongoose.model('Game', gameSchema);