var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('success', {
		title: 'Upload Successful'
	});
});

module.exports = router;