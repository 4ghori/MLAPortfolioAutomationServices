var express = require('express');
var router = express.Router();

var user = require('./apis/user.routes');
var login = require('./apis/login.routes');

router.use('/user', user);
router.use('/login', login);

module.exports = router;