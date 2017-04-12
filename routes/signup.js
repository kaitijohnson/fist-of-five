var express = require('express');
var router = express.Router();
const boom = require('boom');
const knex = require('../knex');
const bcrypt = require('bcrypt');
const humps = require('humps');
const jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
  res.render('signup', {
    title: 'Create an Account'
  });
});


router.post('/', validateSignup, validateEmail, hashPassword, (req, res, next) => {
  console.log(req.body);

  let {
    firstName,
    lastName,
    email,
    hashed_password,
    isInstructor
  } = req.body

  insertUser(humps.decamelizeKeys({
      firstName,
      lastName,
      email,
      hashed_password,
      isInstructor: true
    }))
    .then(insertHandlerCreateToken)
    .then(data => {
      //data is array of token and id
      res.cookie('token', data[0], {
        httpOnly: true
      })
      res.redirect(`dashboard/${data[1]}`)
    })
    .catch(err => {
      console.log(err);
      res.end()
    })
})

function insertHandlerCreateToken(data) {

  return [jwt.sign({
    id: data[0].id,
    firstName: data[0].first_name,
    lastName: data[0].last_name,
    email: data[0].email,
    isInstructor: data[0].is_instructor,
  }, 'shhh'), data[0].id]

}

function validateSignup(req, res, next) {
  if (!req.body.password || !req.body.email || !req.body.firstName || !req.body.lastName) {
    next(boom.create(400, "Bad Username or Pass"))
  } else {
    next()
  }
}

function validateEmail(req, res, next) {
  checkEmail(req.body.email)
    .then(data => {
      if (data) {
        console.log(data);
        res.render('signup', {
          title: 'Create New Account',
          error: 'Email Already Exists'
        })
      } else {
        next()
      }
    })
}

function hashPassword(req, res, next) {
  bcrypt.hash(req.body.password, 12)
    .then(data => {
      delete req.body.password
      req.body.hashed_password = data
      next()
    })
    .catch(err => {
      res.render('signup', {
        title: 'Create New Account',
        error: 'Could not complete account creation'
      })
    })
}

const checkEmail = (email) => knex('users').where('email', email).first()

const insertUser = (user) => knex('users').returning('*').insert(user)
module.exports = router;
