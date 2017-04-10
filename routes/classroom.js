var express = require('express');
var router = express.Router();

const boom = require('boom');
const knex = require('../knex');
const bcrypt = require('bcrypt');
const humps = require('humps');
const jwt = require('jsonwebtoken');

router.get('/:id', function(req, res, next) {
  console.log(router);
  ioFunction()
  res.render('sockettest', {
    title: req.params.id
  })
});


module.exports = router;
