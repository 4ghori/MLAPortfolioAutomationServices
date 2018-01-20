var express = require('express');
var apiRoutes = express.Router();
var config = require('../config');

exports.registerAPIMiddleWare = function () {
    apiRoutes.use(function (req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if(!!token) {
            // if there is a token, verify it. If verified, pass the decoded token to the next controller/function else error
            jwt.verify(token, config.appConfig.secret, function (err, decoded) {
                if (err) {
                    return res.json({ authenticated: false, message: 'Failed to authenticate token.' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
        } else {
            // if there is no token, return an error
            return res.status(403).send({
                authenticated: false,
                message: 'No token found'
            })
        }
    });
};