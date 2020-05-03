const express = require('express');
const router = express.Router();
const sequelize = require('../server');
const db = require('../config/database');
var passport   = require('passport');
const generatePassword = require('../lib/passwordUtils').generatePassword;

const User = db.import('../models/user');


router.get('/', (req, res) => {
    if(req.isAuthenticated()) {
        res.redirect('back');
    } else {
        res.render('signup');
    }
});

router.post('/', (req, res, next) => {
    const saltHash = generatePassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    var data =
    {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        birthdate: req.body.birthdate,
        userType: req.body.userType,
        salt,
        hash
    };

    User.create(data)
    .then(user => {
        console.log(user);
    });

    res.redirect('/login');
});

module.exports = router;