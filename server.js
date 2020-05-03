//Backend for CSCI 6333 Project
//Author: Arnoldo Ramirez

//Express used for internet routing
const express = require('express');
//Handlebars used for rendering web views
const Handlebars = require('handlebars');
const expHbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

//Passport used for site authentication
var passport = require('passport');
//Express-session used for cookies and web session
var session = require('express-session');
//Express-session-sequelize used for storing sessions in Amazon AWS
const sequelizeSessionStore = require('express-session-sequelize')(session.Store);
//Body-parser used for parsing HTTP request body
const bodyParser = require('body-parser');

//Express setup
const app = express();

//Handlebars setup
app.engine('handlebars', expHbs({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine', 'handlebars');

//Body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Static folder used for loading images
app.use(express.static('img'));



// Database config
const db = require('./config/database');

//Test DB
db.authenticate()
.then(() => {
    console.log('DB connect success!');
})
.catch(err => {
    console.error(err);
});

// Initialize session
const seqStore = new sequelizeSessionStore({db});



//load passport strategies
require('./config/passport');

// Passport setup
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: seqStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions



//Define routes
const signup = require('./routes/signup');
const login = require('./routes/login');
const logout = require('./routes/logout');
const orders = require('./routes/orders');

const managers = require('./routes/managers');
const contractors = require('./routes/contractors');


const homeImprovement = require('./routes/homeimprovement');
const cleaning = require('./routes/cleaning');
const landscaping = require('./routes/landscaping');
const familycare = require('./routes/familycare');

//Main page route
app.get('/', (req, res) => {
    res.render('landing', {layout: 'landing'});
    // console.log(req.session);
    // console.log(req.session.passport.user);
});

//Use routes
app.use('/signup', signup);
app.use('/login', login);
app.use('/logout', logout);
app.use('/orders', orders);

app.use('/managers', managers);
app.use('/contractors', contractors);

app.use('/homeImprovement', homeImprovement);
app.use('/cleaning', cleaning);
app.use('/landscaping', landscaping);
app.use('/familycare', familycare);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));