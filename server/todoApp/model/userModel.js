const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt =require('bcryptjs')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        require: [true, 'le nom est requis']
    },
    email: {
        type: String,
        require: [true,"l'email est require"],
        validator: [validator.isEmail, 'veuillez saisir un email correct'],
        lowercase: true,
    },
    password: {
        type: String,
        require: [true, "le mot de passe est requis"],
        select: false
    },
    passwordConfirm: {
        type: String,
        require:[true, "reconfirmez le mot de passe"],
        validate : {
            validator : function (el){
                el === this.password
            },
            message: "le mot n'est pas le même"
        }
    },
    passwordChangedAt: Date
});


userSchema.pre("save", async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined;
    next()
})
userSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await  bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );
        return JWTTimestamp < changedTimestamp;
    }

    return false;
};
const User = mongoose.model('User', userSchema)
module.exports = User