const express = require('express');
const { handleLogout } = require('../controllers/logout_controller');

const router = express.Router();
router.post('/' , handleLogout)

module.exports = router;