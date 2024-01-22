const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const signupToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}
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
}
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
    if(!email||!password) return "veuillez renseignez l'email ou le mot de passe" ;
    const user = await User.findOne({email}).select('+password');
    if (!user || !(await user.correctPassword(password,user.password))) return "l'email ou le mot de passse est incorrect";
   createSendToken(user,200,res)

}