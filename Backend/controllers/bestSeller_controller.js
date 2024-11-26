const productModel = require("../models/productDetailsModel");

const bestSellingProduct = async (req,res) => {
 try {
    const bestProducts = await productModel.find().sort({ productCount: -1 }).limit(5);
    // productModel.find().sort({ created At: -1 }).limit(3); for latest arrival
    res.json(bestProducts);
 } catch (error) {
    console.log(error);
 }
}

module.exports = {
    bestSellingProduct
}