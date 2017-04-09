var express = require('express');
var router = express.Router();
const boom = require('boom');
const knex = require('../knex');
const bcrypt = require('bcrypt');
const humps = require('humps');
const jwt = require('jsonwebtoken');

/* Routes Boilerplate. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});









router.get('/signup', function(req, res, next) {
  res.render('signup', {
    title: 'The Signup Page'
  });
});

router.get('/login', function(req, res, next) {
  res.render('login', {
    title: 'The Login Page'
  });
});

router.get('/dashboard/:id', function(req, res, next) {
  res.render('index', {
    title: 'The individual user\'s dashboard'
  });
});

/* session route will be re-written after socket is configured*/
router.get('/session/:id', function(req, res, next) {
  res.render('index', {
    title: 'A class session'
  });
});

module.exports = router;
