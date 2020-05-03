const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const db = require('./database');
const User = db.import('../models/user');
const isValidPassword = require('../lib/passwordUtils').isValidPassword;

const customFields = {
    usernameField: 'email',
    passwordField: 'password'
}

const verifyCallback = (username, password, done) => {
    User.findOne({where: {email: username}})
    .then(user => {
        if (!user || user.dataValues.userId == null) {return done(null, false)}

        const isValid = isValidPassword(password, user.hash, user.salt);

        if (isValid) {
            return done(null, user);}
        else {
            return done(null, false);}
    })
    .catch(err => {
        done(err);
    });
}

const strategy = new localStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.userId);
});

passport.deserializeUser((userId, done) => {
    User.findByPk(userId)
    .then(user => {
        done(null, user);
    })
    .catch(err => done(err));
});