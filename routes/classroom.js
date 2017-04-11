var express = require('express');
var router = express.Router();

const boom = require('boom');
const knex = require('../knex');
const bcrypt = require('bcrypt');
const humps = require('humps');
const jwt = require('jsonwebtoken');

router.get('/:id', verifyClassExists, function(req, res, next) {
  console.log(router);
  // ioFunction(req);
  res.render('classroom', {
    title: req.params.id
  })
});

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
