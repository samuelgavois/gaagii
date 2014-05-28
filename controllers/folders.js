'use strict';

var Folder = require('../models/folder');
var nconf = require('nconf');

module.exports = function (app) {
    
    app.post('/create-folder', function (req, res) {
		var folderCreate = {name: req.body.name, idParent: req.body.idParent};
		Folder.create(folderCreate, function (err, folder) {
            if (err) { throw err; }
            console.log('Created folder : '+ folder._id);
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(folder));
            res.end();
        });
    });
};
