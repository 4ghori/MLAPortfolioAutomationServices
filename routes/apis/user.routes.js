var express = require('express')
var router = express.Router();
var UserController = require('../../controller/user.controller');

// Map each API to the Controller FUnctions
router.get('/', UserController.getUser);

router.post('/', UserController.createUser);

router.put('/', UserController.updateUser);

router.delete('/:id',UserController.removeUser);


// Export the Router
module.exports = router;