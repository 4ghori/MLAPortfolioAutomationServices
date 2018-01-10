var express = require('express')

var router = express.Router()
var user = require('./apis/user.routes')

router.use('/user', user);

module.exports = router;