var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
<<<<<<< HEAD
  res.render('home', {
    title: 'Work Schedule'
=======

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
>>>>>>> 65c5780ed2c99c1109b223c6aa5ba589e422d07b
  });
});

module.exports = router;