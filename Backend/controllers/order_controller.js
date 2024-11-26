const productModel = require("../models/productDetailsModel");


const handleCount = async (req, res) => {
    try {
        const { id, count } = req.body;
        const updatedProduct = await productModel.findByIdAndUpdate(id, {
            $inc: { productCount: count, productStock: -count },
        }, { new: true });
        res.status(200).json(updatedProduct);

    } catch (error) {
        console.log(error);

    }
}

module.exports = {
    handleCount
}