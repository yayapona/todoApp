const express = require ('express');
const cors = require("cors");
const userRoute = require('./routes/userRoute');
const taskRoute = require('./routes/taskRoute');
const app = express();
const AppError = require('./utils/appError');
const rateLimit =  require('express-rate-limit');
const handlerErrorHandler = require('./controllers/errorController');

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Trop de demandes provenant de cette IP, veuillez réessayer dans une heure !'
});

app.use(cors())
app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/users', userRoute);
app.use('/api/v1/tasks', taskRoute)

app.all('*', (req,res,next) => {
    next(new AppError(`Pas de route associé à cet url ${req.originalUrl}`, 404));
} )

app.use(handlerErrorHandler)

module.exports = app

