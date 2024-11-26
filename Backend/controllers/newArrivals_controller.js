const productModel = require("../models/productDetailsModel");

const newArrivals = async (req,res) => {
 try {
    const newProducts = await productModel.find().sort({ dateAdded: 1 }).limit(10);
    // productModel.find().sort({ created At: -1 }).limit(3); for latest arrival
    res.json(newProducts);
 } catch (error) {
    console.log(error);
 }
}

module.exports = {
    newArrivals
}