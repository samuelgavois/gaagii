'use strict';

var mongoose = require('mongoose');

var FolderModel = function () {

    //Define a super simple schema for folder.
    var folderSchema = mongoose.Schema({
        name: String,
        sort: Number,
        userId: String,
        childrens: Array,
        documents: Array,
    });

    /**
     * Verbose toString method
     */
    folderSchema.methods.whatAmI = function () {
        var greeting = this.name ?
            'Hello, I\'m a ' + this.name + ' and I\'m worth $' + this.content
            : 'I don\'t have a name :(';
        console.log(greeting);
    };

	/*documentSchema.pre('save', function (next) {
		var document = this;
			
	});*/
    return mongoose.model('Folder', folderSchema, 'folder');

};

module.exports = new FolderModel();

