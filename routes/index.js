var express = require('express');
var router = express.Router();
const boom = require('boom');
const knex = require('../knex');
const bcrypt = require('bcrypt');
const humps = require('humps');
const jwt = require('jsonwebtoken');

/* Routes Boilerplate. */
router.get('/', function(req, res, next) {
  res.render('splash', {
    title: 'The Splash Page'
  });
});

/* session route will be re-written after socket is configured*/
// router.get('/classroom/:id', function(req, res, next) {
//   res.render('sockettest', {
//     title: 'Express'
//   });
// });


module.exports = router;
