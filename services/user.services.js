var User = require('../models/user.model');
var _this = this;

exports.getUser = async function(query, page, limit) {
    var options = {
        page,
        limit
    };

    try {
        var users = await User.paginate(query, options);
        return users;
    } catch (e) {
        throw Error('Error while Paginating User')
    }
};

exports.createUser = async function(user){

    // Creating a new Mongoose Object by using the new keyword
    var newUser = new User({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        password: user.password,
        role: user.role,
        email: user.email,
        mobile: user.mobile
    });

    try{
        // Saving the User
        var savedUser = await newUser.save()
        return savedUser;
    }catch(e){
        // return a Error message describing the reason
        throw Error("Error while Creating User")
    }
};

exports.updateUser = async function(user){
    var username = user.username

    try{
        //Find the old User Object by the username

        var oldUser = await User.findById(username);
    }catch(e){
        throw Error("Error occured while Finding the user")
    }

    // If no old User Object exists return false
    if(!oldUser){
        return false;
    }

    console.log(oldUser)

    //Edit the User Object
    oldUser.firstName = user.firstName;
    oldUser.email = user.email;
    oldUser.mobile = user.mobile;

    console.log(oldUser)

    try{
        var savedUser = await oldUser.save()
        return savedUser;
    }catch(e){
        throw Error("And Error occured while updating the User");
    }
};

exports.deleteUser = async function(id){

    // Delete the User
    try{
        var deleted = await User.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("User Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the User")
    }
}