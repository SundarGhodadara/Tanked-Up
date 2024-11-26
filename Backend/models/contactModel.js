const mongoose = require ('mongoose');

const contactSchema = mongoose.Schema(
    {
        email:{
            type:String,
            required:true
        },
        name:{
            type:String,
            require:true
        },
        message: { 
            type: String, 
            default: true 
        }
    }
, {timestamps:true});

const contactModel = mongoose.model('UserContact' , contactSchema );

module.exports = contactModel;