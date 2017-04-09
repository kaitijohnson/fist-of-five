var express = require('express');
var router = express.Router();
const boom = require('boom');
const knex = require('../knex');
const bcrypt = require('bcrypt');
const humps = require('humps');
const jwt = require('jsonwebtoken');

router.get('/:id', verifyToken, getClasses, function(req, res, next) {
  console.log(req.params.id);
  res.render('index', {
    title: `The individual user\'s dashboard ${req.params.id}`
  });
});

function getClasses(req, res, next) {
  getUserClasses(req.params.id)
    .then(data => {
      console.log(data);
    })
}

function verifyToken(req, res, next) {
  jwt.verify(req.cookies.token, 'shhh', function(err, decoded) {
    console.log(Object.keys(decoded));
    if (decoded.id == req.params.id) {
      res.render('dashboard', {
        title: decoded.id
      })
    } else {
      res.clearCookie('token')
      res.redirect(`/dashboard/${decoded.id}`)
    }

  });
}

const getUserClasses = (id) => knex('users').where('id', id)
module.exports = router;
