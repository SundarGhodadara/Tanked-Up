const express = require('express');
const handleItemDisplay = require('../controllers/displayItem_controller');
const { bestSellingProduct } = require('../controllers/bestSeller_controller');
const { newArrivals } = require('../controllers/newArrivals_controller');
const handlePreviousOrderDisplay = require('../controllers/previous_controller');

const displayItemRouter = express.Router();

displayItemRouter.get('/' , handleItemDisplay);
displayItemRouter.get('/bestSelling' , bestSellingProduct);
displayItemRouter.get('/newArrivals', newArrivals);
displayItemRouter.get('/previousOrders' ,handlePreviousOrderDisplay )

module.exports = displayItemRouter;