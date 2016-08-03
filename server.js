var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var port = process.env.PORT || 8080;
//var logger = require('morgan');
var mongoose = require('mongoose');

//app.use(logger('dev'));
// app.use(bodyParser.urlencoded({
// 	extended: false
// }));
app.use(express.static('public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components')); // Use BowerComponents

//database
mongoose.connect('mongodb://localhost/nytsearch');
//var mongodbUri = 'mongodb://greg:12345@ds021343.mlab.com:21343/heroku_lh1cvw0w';

//mongoose.connect(mongodbUri);
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

  





//routes
// app.get('/getArticles', function(req, res) {
//   res.send(index.html);
// });





// app.get('/', function(req, res) {
//   request('https://news.vice.com/', function(error, response, html) {
//     var $ = cheerio.load(html);
//     $('article').each(function(i, element) {

//     	var title = $(this).children('h2').text().replace(/(\n|\t)/gm,"");
//  		var	body = $(this).children('p').text().replace(/(\n|\t)/gm,"");
//  		var	link = $(this).children('h2').children('a').attr('href');

// 	Article.findOne({
// 		'title': title
// 		}, function(err, res) {
	
// 		if(err) {
// 		console.log(err);
// 		}
	

// //if there is no match
// 		if (res === null) {
		
// 				var entry = new Article ({

//  				title: title,
//  				body:  body,
//  				link: link
//  				});
 				

//  				entry.save(function(err, doc) {
//  				  if (err) {
//  				    console.log(err);
//  				  } else {
//  				    console.log(doc);
//  				  }
//  				});


//     };
//   });
// 	});
// });
//   res.send(index.html);
// });





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

// ////////// Get Notes ///////////

// app.post('/saveArticle', function(req, res){
	
// 	var title = "title";
//  	var	body = "body";
//  	var	link = "link";

// console.log(req.body.link);

//  		Article.findOne({
//  		'title': title
//  		}, function(err, res) {
	
//  		if(err) {
//  		console.log(err);
//  		}
	

//  //if there is no match
//  		if (res === null) {
		
//  				var entry = new Article ({

//   				title: title,
//   				body:  body,
//   				link: link
//   				});
 				

//   				entry.save(function(err, doc) {
//   				  if (err) {
//   				    console.log(err);
//   				  } else {
//   				    console.log(doc);
//   				  }
//   				});


//      };
//    });
// 	});




// ///////////////////////////////

// ///////remove note //////////
// app.post('/remove/:id', function(req, res){
	
// 	Note.find({ '_id': req.params.id }).remove().exec();
		
// 	});

// //////////////////////////////


// app.post('/articles/:id', function(req, res){
// 	var newNote = new Note(req.body);

// 	newNote.save(function(err, doc){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			Article.findOneAndUpdate({'_id': req.params.id}, {'note':doc._id})
// 			.exec(function(err, doc){
// 				if (err){
// 					console.log(err);
// 				} else {
// 					res.send(doc);
// 				}
// 			});

// 		}
// 	});
// });


