const mongoose = require ('mongoose');

const userSchema = mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },
        username:{
            type:String,
            require:true,
            unique:true
        },
        isAdmin: { type: Boolean, default: false }
    }
, {timestamps:true});

const userModel = mongoose.model('User' , userSchema );

module.exports = userModel;