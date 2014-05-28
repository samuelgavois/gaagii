'use strict';

var Document = require('../models/document');
var Patch = require('../models/patch');
var dmpmod = require("../lib/diff_match_patch_uncompressed.js");
var nconf = require('nconf');
var nodemailer = require("nodemailer");

module.exports = function (app) {

	
	app.get('/document/:id', function (req, res) {
		Document.findOne({_id:req.param('id')}).exec(function (err, doc) {
            if (err) {
                console.log(err);
            }
			
			var dmp = new dmpmod.diff_match_patch();
			var model =	{
				document: doc,
				patches: [],
				config: { locality: nconf.get("locale"), application_name: nconf.get("application_name") }
			};
			doc.initialContent = doc.content;
			
			//Load patches and apply them
			Patch.find()
				.where('idDocument').equals(doc._id)
				.sort('createdDate')
				.exec(function (err, patches) {
					if (err) {
						console.log(err);
					}
					for(var i = 0; i < patches.length; i++) {
						model.patches.push(patches[i]);
						var strpatch = dmp.patch_fromText(patches[i].patch);
						var results = dmp.patch_apply(strpatch, doc.content);
						doc.content = results[0];
					}
					res.locals.context = { locality: nconf.get("locale"), application_name: nconf.get("application_name") };
					res.render('document', model);
			});
            
        });
    });
	
	app.post('/save-document', function (req, res) {
		var documentUpdate = {name: req.body.name};
		
		Document.update({_id:req.body._id}, documentUpdate, function (err) {
            if (err) { throw err; }
            console.log('Updated document : '+ req.body._id);
            
            if (req.body.patch !== "") {
            	var patchCreate = {idDocument: req.body._id, patch: req.body.patch, createdDate: new Date, enabled: false};
				Patch.create(patchCreate, function (err) {
                    if (err) { throw err; }
                    console.log('Created patch : '+ req.body._id);
                });
            }
        });

		
    });
    
    app.post('/create-document', function (req, res) {
		var documentCreate = {name: req.body.name, content:""};
		Document.create(documentCreate, function (err, doc) {
            if (err) { throw err; }
            console.log('Created document : '+ doc._id);
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(doc));
            res.end();
        });
    });
	
	app.post('/share-document', function (req, res) {
	    var documentShare = {_id: req.body._id};
	    Document.findOne({_id:req.body._id}).exec(function (err, doc) {
            if (err) {
                console.log(err);
            }
            
            var _urlDocument = nconf.get("url_server")+"/"+"document"+"/"+req.body._id;
            var _sender = nconf.get("sender");
            var _emails = req.body.emails;
            var smtpTransport = nodemailer.createTransport("SMTP", nconf.get("smtp"));
            
            for(var i=0;i<_emails.length;i++) {
        		var mailOptions = {
        			from: _sender.name+" <"+_sender.email+">",
        			to: _emails[i],
        			subject: "Gaagii - Partage d'un document",
        			text: "Gaagii - Partage du document "+doc.name,
        			html: "<b>Gaagii</b> - Partage du document "+doc.name+"<p>"+_urlDocument+"</p>"
        		}
        		
        		smtpTransport.sendMail(mailOptions, function(error, response){
        			if(error){
        				console.log(error);
        			}else{
    				    //console.log("Message sent (emails : "+_emails.length+") for document id "+req.body._id);
        			}
        
        			// if you don't want to use this transport object anymore, uncomment following line
        			//smtpTransport.close(); // shut down the connection pool, no more messages
        		});
            }
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(doc));
            res.end();
	    });  
	    
		

		/*var documentCreate = {name: req.body.name, content:""};
		Document.create(documentCreate, function (err, doc) {
            if (err) { throw err; }
            console.log('Created document : '+ doc._id);
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(doc));
            res.end();
        });*/
    });
    
    app.delete('/delete-document', function (req, res) {
		var documentDelete = {_id: req.body._id};
		Document.remove(documentDelete, function (err) {
            if (err) { throw err; }
            var patchDelete = {idDocument: req.body._id};
            Patch.remove(patchDelete, function (err) {
            	console.log('Deleted document : '+ req.body._id);
            
            	res.writeHead(200, { 'Content-Type': 'application/json' });
            	res.write(JSON.stringify({_id: req.body._id}));
            	res.end();
            });
            
        });
    });

};
