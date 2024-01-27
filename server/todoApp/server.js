const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./App')

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: './config.env' });
DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
)
mongoose
    .connect(DB, {
    })
    .then(() => console.log("MongoDB connection établie..."))
    .catch((error) => console.error("MongoDB connection échouée:", error.message));

const port = 3000
app.listen(port, ()=> {
    console.log(`Serveur en marche sur le port ${port}`)
})


process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});