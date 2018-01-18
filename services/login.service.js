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

    if (!!oldUser && oldUser.length !== 0) {
        if (oldUser[0].username === username && oldUser[0].password === password) {
            loginTimeStamp = moment().format('MMMM Do YYYY, h:mm:ss a');

            console.log(loginTimeStamp);

            return {
                authenticated: true,
                username: username,
                role: oldUser[0].role,
                message: 'Logged in successfully'
            }
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