const express = require('express');
const router = express.Router();
const db = require('../config/database');

const Service = db.import('../models/service');
const Company = db.import('../models/company');
const Order = db.import('../models/order');

router.get('/', async (req, res, next) => {
    services = await Service.findAll({where: {serviceType: 'Home Improvement'}});

    var company;
    var i;
    for (i = 0; i < services.length; i++)
    {
        company = await Company.findByPk(services[i].companyId);
        services[i].company = company;
    }

    res.render('homeimprovement', {services});
});

router.get('/:id', (req, res, next) => {
    console.log(req.params.id);

    Service.findByPk(req.params.id)
    .then(service => {
        Company.findByPk(service.companyId)
        .then(company => {
            const prev = '/homeimprovement';
            const total = (parseInt(service.cost) + parseInt(company.visitFee)).toFixed(2);
            data = {
                service,
                company,
                prev,
                total
            }
            res.render('servicedetail', {data});
        })
    })
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