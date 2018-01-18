var User = require('../models/user.model');
var moment = require('moment');

exports.authenticateUser = async function(user){
    var username = user.username,
        password = user.password,
        loginTimeStamp;

    try{
        var oldUser = await User.find({username: username});
    }catch(e){
        throw Error("Error occured while Finding the user")
    }

    if (!!oldUser) {
        if (oldUser.username === username && oldUser.password === password) {
            loginTimeStamp = moment().format('MMMM Do YYYY, h:mm:ss a');

            console.log(loginTimeStamp);

            return {
                authenticated: true,
                username: username,
                message: 'Logged in successfully'
            }
        } else {
            if (oldUser.username !== username) {
                console.log(JSON.stringify(oldUser) + ' ' + username);
                return {
                    authenticated: false,
                    username: username,
                    message: 'User not found'
                }
            }

            if (oldUser.password !== password) {
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