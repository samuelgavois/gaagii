'use strict';

var ArticleModel = require('../models/article');

module.exports = function (app) {

	
	
    app.get('/article/:id', function (req, res) {
    	var article = new ArticleModel(req.param('id'));
        res.render('article', article);
        
    });

};
