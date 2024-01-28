const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const AppError = require("../utils/appError");

const signupToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
};


const createSendToken = (user,statusCode,res) => {
    const token = signupToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    res.cookie('jwt', token, cookieOptions);
    user.password = undefined;
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.status(statusCode).json({
        status: "succès",
        code : 200,
        token,
        data : {
            user
        }
    })
};

exports.protect = async (req, res, next) => {
    let token;
    if (req.header.authorization && req.header.authorization.startsWith('Bearer')) {
        token = req.header.authorization.split('')[1];
    } else if (res.cookie.jwt) {
        token = res.cookie.jwt
    }

    if (!token) {
        return next(
            new AppError('Vous n\'êtes pas connecté ! Veuillez vous connecter pour obtenir l\'accès.', 401)
        );
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError(
                'L\'utilisateur a qui appartient ce jeton n\'existe plus.',
                401
            )
        );
    }
    //  Vérifier si l'utilisateur a changé de mot de passe après l'émission du token
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError('User recently changed password! Please log in again.', 401)
        );
    }
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
};

exports.signup = async (req,res,next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });
   createSendToken(newUser,201,res)
};

exports.login = async (req,res,next) => {
    const {email, password} = req.body
    if(!email||!password) return next(new AppError("l'email ou le mot de passse est incorrect")) ;
    const user = await User.findOne({email}).select('+password');
    if (!user || !(await user.correctPassword(password,user.password))) return next(new AppError("l'email ou le mot de passse est incorrect"));
   createSendToken(user,200,res)
};

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success' });
};

exports.restrictTo = (...roles) => {
    // La fonction middleware retournée prend les arguments (req, res, next)
    return (req, res, next) => {
        // Vérifie si le rôle de l'utilisateur actuel n'est pas inclus dans la liste des rôles autorisés
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError('You do not have permission to perform this action', 403)
            );
        }

        // Si l'utilisateur a le rôle requis, passe à la prochaine fonction middleware
        next();
    };
};

exports.updatePassword = async (req, res, next) => {

    const user = await User.findById(req.user.id).select('+password');

    // 2) Check if POSTed current password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new AppError('Votre mot de passe actuel est erroné.', 401));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    // User.findByIdAndUpdate will NOT work as intended!

    createSendToken(user, 200, res);
};