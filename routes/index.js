var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  req.user.getGroups(function(err, groups) {
    if (err) return next(err);

    groups.each(function(group, cb) {
      req.user.privilege = group.name;
      cb();
    }, function(err) {
      if (err) return next(err);
      return res.render('home', {
      	title: 'Work Schedule'
      });
    });
  });
});

module.exports = router;