const express = require('express');
const { handleCount } = require('../controllers/order_controller');
const {handleOrder} = require('../controllers/userProfile_controller');

const orderRouter = express.Router();

orderRouter.put('/' , handleCount);
orderRouter.post('/OrderConfirm' , handleOrder);


module.exports = orderRouter;