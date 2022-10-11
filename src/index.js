const express= require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app= express();
const path= require('path');
const passport = require('passport');
const session =  require('express-session');
const flash = require('connect-flash');

require('./passport/local-auth');

//settings
app.set('port', 4000);
app.set('views', path.join(__dirname , '/views'))
app.set('view engine', 'ejs');

//connecting to db
mongoose.connect('mongodb://localhost/restaurante')
    //promesas. algo que ocurre segun lo que pase
    .then(db => console.log('DB connected'))
    .catch(err => console.log(err));

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//--
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.user = req.user;
    next();
});

//routes
app.use(require('./routes/index'));

//static files
app.use(express.static(path.join(__dirname, '/public')))

//listening the server
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});

