const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: function () {
            // Make the password required only if googleId is not present
            return !this.socialId;
        }
    },
    socialId: {
        type: String,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    points: {
        type: Number,
        default: 0
    },
    games: {
        type: Array,
        default: []
    },
    certificate: {
        type: String,
        default: 'no'
    },
},
    { timestamps: true }
);

userSchema.methods.verifyPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.virtual('needsPassword').get(function () {
    return !this.socialId;
});

module.exports = mongoose.model('User', userSchema);