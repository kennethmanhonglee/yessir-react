const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// routes
const routes = require('./routes'); //for debugging
const apiRouter = require('./routes/api/index');

// checks environment
const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

if (!isProduction) app.use(cors());
app.use(helmet({
    contentSecurityPolicy: false
}));

app.use(csurf({
    cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
    }
}));

app.use(routes);
app.use('/api', apiRouter);

module.exports = app;