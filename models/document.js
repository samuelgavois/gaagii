'use strict';

var mongoose = require('mongoose');

var DocumentModel = function () {

    //Define a super simple schema for document.
    var documentSchema = mongoose.Schema({
        name: String,
        userId: String,
        content: String
    });

    /**
     * Verbose toString method
     */
    documentSchema.methods.whatAmI = function () {
        var greeting = this.name ?
            'Hello, I\'m a ' + this.name + ' and I\'m worth $' + this.content
            : 'I don\'t have a name :(';
        console.log(greeting);
    };

	/*documentSchema.pre('save', function (next) {
		var document = this;
			
	});*/
    return mongoose.model('Document', documentSchema, 'document');

};

module.exports = new DocumentModel();

