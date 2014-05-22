'use strict';

var mongoose = require('mongoose');

var PatchModel = function () {

    //Define a super simple schema for patch.
    var patchSchema = mongoose.Schema({
        idDocument: String,
        patch: String,
		createdDate : Date
    });

    /**
     * Verbose toString method
     */
    patchSchema.methods.whatAmI = function () {
        var greeting = this.name ?
            'Hello, I\'m a ' + this.idDocument + ' and I\'m worth $' + this.patch
            : 'I don\'t have a name :(';
        console.log(greeting);
    };

	/*documentSchema.pre('save', function (next) {
		var document = this;
			
	});*/
    return mongoose.model('Patch', patchSchema, 'patch');

};

module.exports = new PatchModel();

