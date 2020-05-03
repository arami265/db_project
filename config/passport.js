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

// //load bcrypt
// var bCrypt = require('bcrypt-nodejs');
// const db = require('../config/database');
 
 
// module.exports = function(passport, user) {
 
 
//     const User = db.import('../models/user');
 
//     var LocalStrategy = require('passport-local').Strategy;

//     //serialize
//     passport.serializeUser(function(user, done) {
//     done(null, user.userId);
//     });

//     // deserialize user 
//     passport.deserializeUser(function(userId, done) {
    
//         User.findByPk(userId).then(function(user) {
    
//             if (user) {
    
//                 done(null, user.get());
    
//             } else {
    
//                 done(user.errors, null);
    
//             }
    
//         });
    
//     });
 
//     passport.use('local-signup', new LocalStrategy(
 
//         {
 
//             usernameField: 'email',
 
//             passwordField: 'password',
 
//             passReqToCallback: true // allows us to pass back the entire request to the callback
 
//         },
 
 
 
//         (req, email, password, done) => {
 
//             var generateHash = password => {
 
//                 return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
 
//             };
 
 
 
//             User.findOne({
//                 where: {
//                     email: email
//                 }
//             }).then(user => {
 
//                 if (user)
 
//                 {
 
//                     return done(null, false, {
//                         message: 'That email is already taken'
//                     });
 
//                 } else
 
//                 {
 
//                     var userPassword = generateHash(password);
 
//                     var data =
 
//                         {
//                             email: email,
 
//                             password: userPassword,
 
//                             firstName: req.body.firstName,
 
//                             lastName: req.body.lastName,
//                             phoneNumber: req.body.phoneNumber,
//                             birthdate: req.body.birthdate,
//                             userType: req.body.userType
 
//                         };
//                         //console.log(data);
 
//                     User.create(data).then((newUser, created) => {
 
//                         if (!newUser) {
 
//                             return done(null, false);
 
//                         }
 
//                         if (newUser) {
//                             return done(null, newUser);
//                         }
 
//                     });
 
//                 }
 
//             });
 
//         }
 
//     ));
 
// }