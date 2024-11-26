const productModel = require('../models/productDetailsModel')

const handleItemDisplay = async (req,res) => {
    const response = await productModel.find({});
    res.json(response);
}

module.exports = handleItemDisplay;