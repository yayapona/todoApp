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
   

});
userSchema.pre("save", async function(next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined;
    next()
})
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await  bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model('User', userSchema)
module.exports = User