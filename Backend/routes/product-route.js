const express = require('express');
const {handleProduct, handleRemoveProduct} = require('../controllers/product-controller');


const productRouter = express.Router();

productRouter.post('/' , handleProduct);
productRouter.delete('/removeProduct/:id' , handleRemoveProduct)

module.exports = productRouter;