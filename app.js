var express = require('express');
var stormpath = require('express-stormpath');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/work';
var config = require('./config.json');
var uri = config.URI;
var routes = require('./routes/index');
var uploads = require('./routes/upload');
var success = require('./routes/success');
var downloads = require('./routes/download');
var logout = require('./routes/logout');
var dbMain;

MongoClient.connect('mongodb://localhost:27017/work', function(err, db) {
	if (err) throw err;
MongoClient.connect(uri, function(err, db) {
	if (err) console.log(err);
	dbMain = db;
});

var app = express();

app.set('views', './views');
app.set('view engine', 'jade');
app.set('port',  (process.env.PORT || 5000));

var stormpathMiddleware = stormpath.init(app, {
  apiKeyFile: './apiKey.properties',
  application: 'https://api.stormpath.com/v1/applications/7CkGhqhLl2yS0wCVsWyJgS',
  secretKey: 'slngisntgswntpqptynsansfxw',
  expandCustomData: true,
  enableForgotPassword: true,
  enableRegistration: false
});

app.use(stormpathMiddleware);
app.use(express.static(__dirname + '/public'));

//Make the db accessible to various http requests
app.use(function(req, res, next) {
  req.db = dbMain;
  next();
});
app.use('/', stormpath.loginRequired, routes);
app.use('/upload', uploads);
app.use('/success', success);
app.use('/download', downloads);
app.use('/logout', logout);
app.use('/profile', stormpath.loginRequired, require('./profile')());

app.listen(3000);
app.listen(app.get('port'));