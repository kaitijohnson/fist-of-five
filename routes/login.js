var express = require('express');
var router = express.Router();
const boom = require('boom');
const knex = require('../knex');
const bcrypt = require('bcrypt');
const humps = require('humps');
const jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
  res.render('login', {
    title: 'User Login'
  });
});

router.post('/', validateLogin, validateEmail, (req, res, next) => {

})


function validateLogin(req, res, next) {
  console.log('hehehehhehehehehwe made it');
  console.log(req.body);
  if (!req.body.email || !req.body.password) {
    next(boom.create(400, "Bad Username or Password"))
  }
  next()
}

function validateEmail(req, res, next) {
  console.log('we here?');
  getUserByEmail(req.body.email)
    .then(data => {
      console.log(data);
      if (data) {
        bcrypt.compare(req.body.password, data.hashed_password, (err, r) => {
          if (r) {
            let token = jwt.sign({
              id: data.id,
              firstName: data.first_name,
              lastName: data.last_name,
              isInstructor: data.is_instructor,
              email: req.body.email
            }, 'shhh')
            // console.log(token)
            res.cookie('token', token, {
              httpOnly: true
            })
            if (req.body.isGoogle) {
              res.send(`dashboard/${data.id}`)
            } else {
              res.redirect(`dashboard/${data.id}`)
            }
          }
        })
      } else {
        res.render('splash', {
          title: 'Login',
          error: 'Bad Username or Password'
        })
      }
    })
}

const getUserByEmail = (email) => knex('users').where('email', email).select(['email', 'hashed_password', 'id', 'is_instructor', 'first_name', 'last_name']).first()

module.exports = router;
