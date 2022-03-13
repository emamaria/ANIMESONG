const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const { validationPassword, validationEmail } = require('../../utils/validators/validators.js');

const { setError } = require('../../utils/error/error')

const userSchema = new mongoose.Schema(
    {
        name: { type: String, trim: true, required: true },
        email: { type: String, trim: true, required: true },
        password: { type: String, trim: true, required: true }
       
    }
);

userSchema.pre("save", function(next){
    if(!validationPassword(this.password)){
        return next(setError(400, 'This password has invalid syntax'))
    }

    if(!validationEmail(this.email)){
        return next(setError(400, 'This email syntax is not correct'))
    }
   

    this.password = bcrypt.hashSync(this.password, 10); 
    next();
});

const User = mongoose.model("user", userSchema);
module.exports = User;