const express = require ('express');
const cors = require("cors");

const userRoute = require('./routes/userRoute');
const taskRoute = require('./routes/taskRoute');

const app = express();
app.use(express.json({ limit: '10kb' }));

app.use(cors());
app.use('/api/v1/users', userRoute);
app.use('/api/v1/tasks', taskRoute)


module.exports = app

