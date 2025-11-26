const express  = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mongodb = require('./database/database')
const errorHandler = require('./utilities/errorHandler')
const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github2').Strategy;
const cors = require('cors')
require('dotenv').config();


app
.use(bodyParser.json())
.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());
app.use('/', require('./routes/index'))
app.use('/products', require('./routes/products'));
app.use('/stores', require('./routes/stores'));
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next();
})
app.use(cors({ origin: '*'}))

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile)
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use(errorHandler);

app.get('/', (req,res) => {
    console.log(req.session.user);
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out') 
})

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}), 
    (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is running on port ${port}`);
        })
    }
})
