var express = require('express');
var router = express.Router();
const boom = require('boom');
const knex = require('../knex');
const bcrypt = require('bcrypt');
const humps = require('humps');
const jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
  res.render('login', {
    title: 'The Login Page'
  });
});

router.post('/', validateLogin, validateEmail, (req, res, next) => {

})


function validateLogin(req, res, next) {
  if (!req.body.email || !req.body.password) {
    next(boom.create(400, "Bad Username or Password"))
  }
  next()
}

function validateEmail(req, res, next) {
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
            res.redirect(`dashboard/${data.id}`)
          }
        })
      } else {
        res.render('index', {
          title: 'Login',
          error: 'Bad Username or Password'
        })
      }
    })
}

const getUserByEmail = (email) => knex('users').where('email', email).select(['email', 'hashed_password', 'id']).first()

module.exports = router;
