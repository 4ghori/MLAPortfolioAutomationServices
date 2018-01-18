var express = require('express');
var router = express.Router();
var LoginController = require('../../controller/login.controller');

// Map each API to the Controller Functions
router.post('/', LoginController.authenticateUser);


// Export the Router
module.exports = router;