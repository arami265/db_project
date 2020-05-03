const express = require('express');
const router = express.Router();
const sequelize = require('../server');
const db = require('../config/database');
var passport   = require('passport');

const User = db.import('../models/user');

router.get('/', (req, res) => {
    if(req.isAuthenticated()) {
        res.redirect('back');
    } else {
        res.render('login');
    }
});

router.post('/', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/'}));

module.exports = router;