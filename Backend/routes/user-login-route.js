const express = require('express');
const { handleLogin , handleToken, verifyUser} = require('../controllers/login_controller');

const router = express.Router();

router.post('/' , handleLogin)
router.post('/token' , handleToken)
router.get('/verifyUser' , verifyUser)

module.exports = router;