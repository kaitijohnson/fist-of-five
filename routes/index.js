var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sockettest', {
    title: 'Express'
  });
});

module.exports = router;
