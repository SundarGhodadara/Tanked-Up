const mongoose = require('mongoose');

const productSchema = mongoose.Schema({

    images: {
        type: [String],
        required: true
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
    productStock:{
        type: Number,
        required: true
    },
    productCount:{
        type: Number,
        required: true,
        default:0
    },
    selectedSizes:{
        type: [String],
        required: true
    },
    productCategory:{
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
      }

} , {timestemps:true});

const productModel = mongoose.model('Products' , productSchema );

module.exports = productModel;