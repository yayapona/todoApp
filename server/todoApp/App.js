const express = require ('express');
const cors = require("cors");
const userRoute = require('./routes/userRoute');
const taskRoute = require('./routes/taskRoute');
const app = express();
const AppError = require('./utils/appError');
const handlerErrorHandler = require('./controllers/errorController')

app.use(cors())
app.use(express.json({ limit: '10kb' }));


app.use('/api/v1/users', userRoute);
app.use('/api/v1/tasks', taskRoute)

app.all('*', (req,res,next) => {
    next(new AppError(`Pas de route associé à cet url ${req.originalUrl}`, 404));
} )

app.use(handlerErrorHandler)

module.exports = app

