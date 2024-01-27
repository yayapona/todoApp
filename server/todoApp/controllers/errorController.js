const AppError = require('../utils/appError');
const handleCastErrorDB = err => {
    const message = `Invalide ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};
const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
};
const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);

    const message = `Données d'entrée non valides. ${errors.join('. ')}`;
    return new AppError(message, 400);
};
const sendErrorDev = (err, res) => {
   res.status(err.statusCode).json({
       status: err.status,
       message: err.message
   })
};

const sendErrorProd = (err,res) => {
    if (err.isOperational){
        res.status(err.statusCode).json({
           status: err.status,
            message: err.message
        })
    }else{
        res.status(500).json({
            status: 'erreur',
            message: 'Quelque chose a très mal tourné'
        })
    }
}
module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'échec';

    if(process.env.NODE_ENV == 'devolpement'){
        sendErrorDev(err,res)
    }else if(process.env.NODE_ENV == 'production'){
        let error = { ...err };
        error.message = err.message;
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

        sendErrorProd(error,res)
    }

}