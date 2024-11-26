const express = require('express');
const { handleRegister } = require('../controllers/user_controller');

const router = express.Router();
router.post('/' , handleRegister)

module.exports = router;