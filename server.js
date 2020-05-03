const express = require('express');
const Handlebars = require('handlebars');
const expHbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
var path = require('path');

var passport = require('passport');
var session = require('express-session');
const sequelizeSessionStore = require('express-session-sequelize')(session.Store);
const bodyParser = require('body-parser');
// const path = require('path');

//Express setup
const app = express();
// app.use(express.static(path.join(__dirname, 'public')));

// Handlebars
app.engine('handlebars', expHbs({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('img'));
var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, 'img', 'favicon.ico')));
// app.use('/favicon.ico', express.static('img/favicon.ico'));


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



// Define routes
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

// Main page route
app.get('/', (req, res) => {
    res.render('landing', {layout: 'landing'});
    // console.log(req.session);
    // console.log(req.session.passport.user);
});

// Use routes
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
// app.use('/api/addresses', addresses);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));