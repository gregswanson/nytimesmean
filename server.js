var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var port = process.env.PORT || 3000;
//var logger = require('morgan');
var mongoose = require('mongoose');

//app.use(logger('dev'));
// app.use(bodyParser.urlencoded({
// 	extended: false
// }));
app.use(express.static('public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components')); // Use BowerComponents

//database
//mongoose.connect('mongodb://localhost/nytsearch');
var mongodbUri = 'mongodb://greg:12345@ds139675.mlab.com:39675/heroku_dch8t128';

mongoose.connect(mongodbUri);
var db = mongoose.connection;

db.on('error', function (err) {
console.log('Mongoose Error: ', err);
});
db.once('open', function () {
console.log('Mongoose connection successful.');
});


//listen
app.listen(port, function() {
  console.log('App running on port ' + port);
});

//schemas

var Article = require('./app/Article.js');


// POST Routes
    // --------------------------------------------------------
    // Provides method for saving new users in the db
    app.post('/saveArticle', function(req, res){
      
       	var title = req.body.title;
  		var	body = req.body.body;
  		var	link = req.body.link;

        	Article.findOne({
		'title': title
		}, function(err, res) {
	
		if(err) {
		console.log(err);
		}
	

//if there is no match
		if (res === null) {
		
				var entry = new Article ({

 				title: title,
 				body:  body,
 				link: link
 				});
 				

 				entry.save(function(err, doc) {
 				  if (err) {
 				    console.log(err);
 				  } else {
 				    console.log(doc);
 				  }
 				});
   };
  });
	});


app.get('/getArticles', function(req, res){
	Article.find({}, function(err, doc){
		if (err){
			console.log(err);
		} else {
			res.json(doc);
		}
	});
});

app.post('/delete', function(req, res){
	
	Article.find({ '_id': req.body.id }).remove().exec();
});



