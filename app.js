const express  = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mongodb = require('./database/database')
const errorHandler = require('./utilities/errorHandler')
const passport = require('passport');
const session = require('express-session');
const githubStrategy = require('passport-github2').Strategy;
const cors = require('cors')

app
    .use(bodyParser.json())
    .use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    }))
    .use((req,res,next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        next();
    })
    .use(cors({ methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}))
    .use(cors({ origin: '*'}))
    .use('/', require('./routes/index'))
    .use('/products', require('./routes/products'))
    .use('/stores', require('./routes/stores'))
    .use(errorHandler)
    passport.use(new githubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientServer: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile)
    }
));


mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is running on port ${port}`);
        })
    }
})
