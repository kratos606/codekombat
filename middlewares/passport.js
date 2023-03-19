const passport = require('passport');
const User = require('../models/users')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GitHubStrategy({
    clientID: "989ac6d0c30c72eba9d3",
    clientSecret: "4849007c59ead0451f0a4ae8b7523d8e553be1e1",
    callbackURL: "http://localhost/api/auth/github-login/callback",
    scope: 'user:email'
},
    async function (accessToken, refreshToken, profile, cb) {
        const userExists = await User.findOne({ socialId: profile._json.id });
        if (userExists) return cb(null, userExists);
        User.create({ socialId: profile.id, username: profile.username, email: profile.emails[0].value })
        return cb(null, userExists);
    }
));

passport.use(new FacebookStrategy({
    clientID: "535309568731711",
    clientSecret: "a1f536a6b7ed1de69c7311f16c26f68c",
    callbackURL: "http://localhost/api/auth/facebook-login/callback",
    profileFields: ['id', 'emails', 'name']
},
    async function (accessToken, refreshToken, profile, cb) {
        const userExists = await User.findOne({ socialId: profile._json.id });
        if (userExists) return cb(null, userExists);
        User.create({ socialId: profile._json.id, username: profile._json.first_name, email: profile._json.email })
        return cb(null, userExists);
    }
));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
    async function (accessToken, refreshToken, profile, cb) {
        const userExists = await User.findOne({ socialId: profile.id });
        if (userExists) return cb(null, userExists);
        User.create({ socialId: profile.id, username: profile.displayName, email: profile.emails[0]['value'] })
        return cb(null, userExists);
    }
));

module.exports = passport;