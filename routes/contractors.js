const express = require('express');
const router = express.Router();
const db = require('../config/database');
const generatePassword = require('../lib/passwordUtils').generatePassword;

// const User = require('../../models/user');
const User = db.import('../models/user');

// @route   GET api/users/
// @desc    Gets all users
// @access  Public
router.get('/signup', (req, res) =>
User.findAll()
.then(users => {
    console.log(users);
    res.sendStatus(200);
    })
.catch(err => console.log(err)));

router.post('/signup', (req, res, next) => {
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
        licenseNumber: req.body.licenseNumber,
        companyId: req.body.companyId,
        salt,
        hash
    };

    User.create(data)
    .then(user => {
        console.log(user);
        res.redirect('/contractors/login');
    })
    .catch(err => {
        console.log(err);
        res.redirect('/contractors/signup')});
});

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Users works!'}));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    User.findOne({email: req.body.email});
});

module.exports = router;