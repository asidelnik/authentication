// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();


// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Authentication middleware
app.use(passport.initialize());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/Authentication-Passport')));

/*
app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/Angusales/index.html'));      //'dist/index.html'
});
*/

//4200

passport.use(new LocalStrategy(function (username, password, done) {
    if ((username === "john") && (password === "password")) {
        return done(null, { username: username, id: 1 });
    } else {
        return done(null, false);
    }
}));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?err',
    session: false
}));


// Catch all other routes and return the index file
//app.get
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/Authentication-Passport/index.html'));
});

const port = process.env.PORT || '4200';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));