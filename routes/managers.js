const express = require('express');
const router = express.Router();
const db = require('../config/database');
const generatePassword = require('../lib/passwordUtils').generatePassword;

const User = db.import('../models/user');
const Address = db.import('../models/address');
const Company = db.import('../models/company');
const Service = db.import('../models/service');

router.get('/', (req, res) => {
    if(req.isAuthenticated()) {
        User.findByPk(req.session.passport.user)
        .then(user => {
            if (user.userType == 'Manager') {
                console.log('Found manager!')
                res.sendStatus(200);
            }
            else {
                console.log('Not a manager...')
                res.sendStatus(200);
            }
        })
    }
});

router.post('/addservice', (req, res, next) => {
    if(req.isAuthenticated()) {
        User.findByPk(req.session.passport.user)
        .then(user => {
            if (user.userType == 'Manager') {
                const companyId = user.companyId;

                serviceData = {
                    name: req.body.name,
                    companyId,
                    description: req.body.description,
                    serviceType: req.body.serviceType,
                    cost: req.body.cost,
                    serviceDuration: req.body.serviceDuration
                }
    
                Service.create(serviceData)
                .then(service => {
                    console.log('Service created!');
                    res.sendStatus(200);
                })
            }
            else {
                console.log('Not a manager...')
                res.sendStatus(200);
            }

        })
    }
});

router.post('/signup', (req, res, next) => {
    const saltHash = generatePassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    var addressData =
    {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode
    }

    Address.create(addressData)
    .then(address => {
        const addressId = address.addressId;

        var companyData =
        {
            name: req.body.companyName,
            email: req.body.companyEmail,
            addressId,
            phoneNumber: req.body.companyPhoneNumber,
            visitFee: req.body.visitFee,
            description: req.body.description
        }

        Company.create(companyData)
        .then(company => {
            const companyId = company.companyId;

            var data =
            {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                birthdate: req.body.birthdate,
                userType: req.body.userType,
                companyId,
                licenseNumber: req.body.licenseNumber,
                salt,
                hash
            };

            User.create(data)
            .then(user => {
                console.log(user);
                res.redirect('/managers/login');
            })
            .catch(err => console.log(err));
        });
    });
});

module.exports = router;