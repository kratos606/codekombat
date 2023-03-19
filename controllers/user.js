const User = require('../models/users');
const Joi = require("@hapi/joi");
const bcrypt = require('bcrypt');
const { createSolution, updateSolution } = require('./solution');
const Solution = require('../models/solutions');
const Game = require('../models/games')
const PythonShell = require('python-shell').PythonShell;
const fs = require('fs');

// Get all users

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Get user by id

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// update validation

const updateValidation = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required().email()
});

// update a user with user

const update = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email) return res.json({ error: "You must fill all required fields" })
        const { error } = updateValidation.validate({ username, email });
        if (error) return res.json({ error: error.details[0].message });
        const emailExist = await User.findOne({ _id: { $ne: req.params.id }, email: req.body.email });
        if (emailExist) return res.json({ error: "Email already exists" });
        const salt = await bcrypt.genSalt(10);
        await User.findById(req.params.id).then(async (user) => {
            if (!user) return res.json({ error: "User not found" });
            user.username = req.body.username;
            user.email = req.body.email;
            req.body.password != undefined ? user.password = await bcrypt.hash(password, salt) : user.password = user.password;
            await user.save();
            res.json({ success: "User updated successfully" });
        }).catch(err => res.json({ error: err.message }));
    } catch (err) {
        res.json({ error: err.message });
    }
}

// update a user with admin

const updateUser = async (req, res) => {
    try {
        const { username, email, isAdmin, password } = req.body;
        if (!username || !email) return res.json({ error: "You must fill all required fields" })
        const { error } = updateValidation.validate({ username, email });
        if (error) return res.json({ error: error.details[0].message });
        const emailExist = await User.findOne({ _id: { $ne: req.params.id }, email: req.body.email });
        if (emailExist) return res.json({ error: "Email already exists" });
        const salt = await bcrypt.genSalt(10);
        await User.findById(req.params.id).then(async (user) => {
            if (!user) return res.json({ error: "User not found" });
            user.username = req.body.username;
            user.email = req.body.email;
            user.isAdmin = req.body.isAdmin;
            req.body.password != undefined ? user.password = await bcrypt.hash(password, salt) : user.password = user.password;
            await user.save();
            res.json({ success: "User updated successfully" });
        }).catch(err => res.json({ error: err.message }));
    }
    catch (err) {
        res.json({ error: err.message });
    }
}

// delete a user

const remove = async (req, res) => {
    try {
        User.findById(req.params.id).then(async (user) => {
            if (!user) return res.json({ error: "User not found" });
            await user.remove();
            res.json({ success: "User deleted successfully" });
        }).catch(err => res.json({ error: err.message }));
    } catch (err) {
        res.json({ error: err.message });
    }
}

// const generate certificate

const getCertificate = async (req, res) => {
    const user = await User.findById(req.user.id);
    const games = await Game.find({ _id: { $nin: user.games } }).count();
    if (games === 0) {
        PythonShell.run('/app/assets/generate.py', { args: [user.username] }, async function (err, results) {
            if (err) throw err;
            user.certificate = results[0];
            await user.save()
            return res.json({ certificate: results[0] });
        });
    }
    else {
        return res.json({ error: "You must finish all games" });
    }
}

// check certificate

const checkCertificate = async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.json({ error: "User not found" });
    if (user.certificate === 'no') {
        return res.json({ error: "User does not have a certificate" });
    }
    else {
        PythonShell.run('/app/assets/generate.py', { args: [user.username] }, async function (err, results) {
            if (err) throw err;
            user.certificate = results[0];
            await user.save()
            return res.json({ certificate: results[0] });
        });
    }
}

// increase user points

const increaseUserPoints = async (userId, gameId, amount, solution) => {
    const user = await User.findById(userId);
    if (!user.games.includes(gameId)) {
        user.points += amount;
        user.games.push(gameId);
        await user.save();
    }
    Solution.findOne({ game: gameId, user: userId }).then(async (result) => {
        if (!result) {
            await createSolution(userId, gameId, solution);
        } else {
            await updateSolution(userId, gameId, solution);
        }
    })
}

module.exports = { getUsers, getUserById, update, updateUser, remove, increaseUserPoints, getCertificate, checkCertificate };
