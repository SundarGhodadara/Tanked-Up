const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productPrice:{
        type: Number,
        required: true
    },
    selectedSizes:{
        type: String,
        required: true
    },
    productQuantity:{
        type: Number,
        required: true
    },
    productCategory:{
        type: String,
        required: true
    },
    purchaseDate: {
        type: Date,
        default: Date.now
      }

} , {timestemps:true});

const orderModel = mongoose.model('Orders' , orderSchema );

module.exports = orderModel;