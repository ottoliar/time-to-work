var express = require('express');
var router = express.Router();

router.get('/logout', function(req, res) {
	res.render('logout', {
		title: 'Logging Out'
	});
});

module.exports = router;