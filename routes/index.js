var express = require('express');
var router = express.Router();

/* Routes Boilerplate. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Fist to Five Splashpage' });
});

router.get('/signup', function(req, res, next) {
  res.render('index', { title: 'The Signup Page' });
});

router.get('/dashboard/:id', function(req, res, next) {
  res.render('index', { title: 'This is an individual user\'s dashboard' });
});

/* session route will be re-written after socket is configured*/
router.get('/session/:id', function(req, res, next) {
  res.render('index', { title: 'This is a class session' });
});

module.exports = router;
