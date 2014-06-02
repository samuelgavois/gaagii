'use strict';

var Folder = require('../models/folder');
var nconf = require('nconf');

module.exports = function (app) {
    
    app.post('/create-folder', function (req, res) {
        Folder.count({userId: nconf.get("userId")}).exec(function (err, count) {
            if (err) { throw err; }
            if (count === 0) {
                //Création du dossier parent 'Mon Gaagii'
                var folderCreate = {name: 'Mon Gaagii', sort: 1, userId: nconf.get("userId"), childrens: [{name: req.body.name, sort: 1, childrens: []}]};
                Folder.create(folderCreate, function (err, folder) {
                    if (err) { throw err; }
                    console.log('Created folder : '+ folder._id);
                    
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.write(JSON.stringify(folder));
                    res.end();
                });
            } else {
                //Rattachement du dossier au dossier parent
                
            }
        });
        
    });
};
