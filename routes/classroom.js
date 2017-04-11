var express = require('express');
var router = express.Router();

const boom = require('boom');
const knex = require('../knex');
const bcrypt = require('bcrypt');
const humps = require('humps');
const jwt = require('jsonwebtoken');


// Does class exist in socket object?
// if no then check if instructor? if is insructor then create the room
// if not instructor send back to dashboard with error saying no room in session
//if class exists let them go through
router.get('/:id', verifyClassExists, createTokenObject, function(req, res, next) {
  token = res.locals.token;
  res.render('classroom', {
    title: req.params.id,
    token
  })
});

function createTokenObject(req, res, next) {
  jwt.verify(req.cookies.token, 'shhh', (err, decoded) => {
    res.locals.token = decoded
    next()
  })
}

function verifyClassExists(req, res, next) {
  searchClass(req.params.id)
    .then(data => {
      if (data) {
        next()
      } else {
        jwt.verify(req.cookies.token, 'shhh', (err, decoded) => res.redirect(`/dashboard/${decoded.id}`))
      }
    })
}

const searchClass = (id) => knex('classes').where('id', id).first()
module.exports = router;
