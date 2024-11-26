const express = require('express');
const { handleContact } = require('../controllers/contact_controller');


const contactRouter = express.Router();
contactRouter.post('/' , handleContact)

module.exports = contactRouter;