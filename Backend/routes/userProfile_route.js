const express = require('express');
const {handleOrder} = require('../controllers/userProfile_controller');


const orderRouter = express.Router();

orderRouter.post('/' , handleOrder);


module.exports = orderRouter;