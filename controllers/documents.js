'use strict';

var Document = require('../models/document');
var Folder = require('../models/folder');
var nconf = require('nconf');

module.exports = function (app) {


    app.get('/documents', function (req, res) {
        Document.find().exec(function (err, docs) {
            if (err) {
                console.log(err);
            }
            
            Folder.find().exec(function (err, folders) {
                if (err) {
                    console.log(err);
                }
                
                var model = {
                    documents: docs,
                    folders: folders,
                    config: { locality: nconf.get("locale"), application_name: nconf.get("application_name") }
                };
                res.locals.context = { locality: nconf.get("locale"), application_name: nconf.get("application_name") };
                res.render('documents', model);
            });
        });
        
    });

};
