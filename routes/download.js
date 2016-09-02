var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	var dbLocal = req.db;
  	var collection = dbLocal.collection('chip');
  	collection.find().toArray(function(err, items) {
  		res.send(items);
	});
 });

router.get('/employeelist', function(req, res) {
	var dbLocal = req.db;
	var collection = dbLocal.collection('employeeList');
  	collection.find().toArray(function(err, items) {
  		res.send(items);
	});
});

 module.exports = router;