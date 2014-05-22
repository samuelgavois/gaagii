'use strict';

var mongoose = require('mongoose');

var UserModel = function () {

    //Define a super simple schema for user.
    var userSchema = mongoose.Schema({
        name: String,
        content: String
    });

    /**
     * Verbose toString method
     */
    userSchema.methods.whatAmI = function () {
        var greeting = this.name ?
            'Hello, I\'m a ' + this.name + ' and I\'m worth $' + this.content
            : 'I don\'t have a name :(';
        console.log(greeting);
    };

	/*documentSchema.pre('save', function (next) {
		var document = this;
			
	});*/
    return mongoose.model('User', userSchema, 'user');

};

module.exports = new UserModel();

