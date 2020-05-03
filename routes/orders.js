const express = require('express');
const router = express.Router();
const db = require('../config/database');

// const company = require('../../models/company');
const User = db.import('../models/user');
const Service = db.import('../models/service');
const Company = db.import('../models/company');
const Order = db.import('../models/order');
//const Address = db.import('../models/address');

// @route   GET api/companies/
// @desc    Gets all companies
// @access  Public
router.get('/', async (req, res, next) => {
    if(req.isAuthenticated()) {
        orders = await Order.findAll({where: {userId: req.session.passport.user}});

        var service;
        var company;
        var i;
        for (i = 0; i < orders.length; i++)
        {
            service = await Service.findByPk(orders[i].serviceId);
            company = await Company.findByPk(service.companyId);
            orders[i].service = service;
            orders[i].company = company;
        }

        res.render('orders', {orders})

    } else {
        res.render('login');
    }
});

router.get('/:id', async (req, res, next) => {
    if(req.isAuthenticated()) {
        console.log(req.params.id);

        order = await Order.findByPk(req.params.id);
        service = await Service.findByPk(order.serviceId);
        company = await Company.findByPk(service.companyId);

        const prev = '/orders';
        const total = (parseInt(service.cost) + parseInt(company.visitFee)).toFixed(2);
        data = {
            order,
            service,
            company,
            prev,
            total
        }

        res.render('orderdetail', {data});
    } else {
        res.render('login');
    }
});

router.post('/:id', (req, res, next) => {

    if(req.isAuthenticated()) {
        Service.findByPk(req.params.id)
    .then(service => {
        Company.findByPk(service.companyId)
        .then(company => {
            const total = (parseInt(service.cost) + parseInt(company.visitFee)).toFixed(2);

            data = {
                userId: req.session.passport.user,
                serviceId: service.serviceId,
                reservationDate: req.body.date,
                reservationStatus: 'Pending',
                total
            }
            
            Order.create(data)
            .then(res.redirect('/orders'))
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            })
        })
    })
    } else {
        res.redirect('/login');
    }
});

module.exports = router;