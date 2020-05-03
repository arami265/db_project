const express = require('express');
const router = express.Router();
const sequelize = require('../server');
const db = require('../config/database');
var passport   = require('passport');

// const company = require('../../models/company');
const User = db.import('../models/user');
//const Address = db.import('../models/address');

// @route   GET api/companies/
// @desc    Gets all companies
// @access  Public
router.get('/', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;