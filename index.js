var express = require('express');
var Twitter = require('twitter');

var app = express();

// var router = express.Router(); 

var client = new Twitter({
  consumer_key: 'SSidIR7pn9IWGiTf45xtkFbwY',
  consumer_secret: 'GKxnNZFiosM8MWF1E1QF30XXEHK6fUyc8rlSLWtjL7Y6c4zgxH',
  access_token_key: '3010457281-VvFA1477x4RH7Qth947d43Ux1TPNjB8wExrwAP5',
  access_token_secret: 'tmVcLhzj0TVaTK3dEDxFM06JFgzXnLmCdaxilJ8YAegX9'
});

app.set('view engine', 'pug')

app.get('/', function(req, res, next){
	res.status(200).render('index',{title: 'Twitter Search Tweets'});
});


app.get('/search', function(req, res, next) {
  // https://dev.twitter.com/rest/reference/get/statuses/user_timeline
  var query = req.param('q');
  client.get('statuses/user_timeline', { screen_name: query || 'nodejs', count: 20 }, function(error, tweets, response) {
    if (!error) {
      // res.status(200).render('index', { title: 'Express', tweets: tweets });
      res.status(200).render('tweets', { title: 'Tweets', tweets: tweets });
      // console.log(tweets);
      // res.status(200).send(tweets);
    }
    else {
    	console.log("error getting tweets");
      res.status(500).json({ error: error });
    }
  });
});

app.listen(3000);