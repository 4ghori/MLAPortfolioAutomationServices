var User = require('../models/user.model');
var moment = require('moment');
var jwt = require('jsonwebtoken');
var config = require('../config');

exports.authenticateUser = async function(user){
    var username = user.username,
        password = user.password,
        loginTimeStamp;

    try{
        var oldUser = await User.find({username: username});
    }catch(e){
        throw Error("Error occured while Finding the user")
    }

    if (!!oldUser && oldUser.length !== 0) {
        if (oldUser[0].username === username && oldUser[0].password === password) {
            loginTimeStamp = moment().format('MMMM Do YYYY, h:mm:ss a');
            var payload = {
                authenticated: true,
                username: username,
                role: oldUser[0].role,
                isActive: oldUser[0].isActive,
                lastLogin: oldUser[0].lastLogin,
                message: 'Logged in successfully',
                token: ''
            };

            var token = jwt.sign(payload, config.appConfig.secret, {
                expiresIn: '1h'
            });

            payload.token = token;

            // Save the last login time of the user
            console.log(loginTimeStamp);

            return payload;
        } else {
            if (oldUser[0].username !== username) {
                return {
                    authenticated: false,
                    username: username,
                    message: 'User not found'
                }
            }

            if (oldUser[0].password !== password) {
                return {
                    authenticated: false,
                    username: username,
                    message: 'Incorrect password'
                }
            }
        }
    } else {
        return {
            authenticated: false,
            username: username,
            message: 'User not found'
        }
    }
};