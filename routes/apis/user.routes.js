var express = require('express')
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../../config');
var middleware = require('../../middleware/api.middleware');
var UserController = require('../../controller/user.controller');

router = middleware.configureMiddleware(router);

// Map each API to the Controller FUnctions
router.get('/', UserController.getUser);
router.post('/', UserController.createUser);
router.put('/', UserController.updateUser);
router.delete('/:id',UserController.removeUser);


// Export the Router
module.exports = router;