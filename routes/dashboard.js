var express = require('express');
var router = express.Router();
const boom = require('boom');
const knex = require('../knex');
const bcrypt = require('bcrypt');
const humps = require('humps');
const jwt = require('jsonwebtoken');

router.get('/:id', verifyToken, getClasses, function(req, res, next) {
  console.log(req.params.id);
  getAllClasses()
    .then(classes => {
      console.log(classes);
      res.render(`dashboard`, {
        title: `The individual user\'s dashboard ${req.params.id}`,
        classes
      });
    })
});

<<<<<<< HEAD
router.post('/:id', verifyClassName, function(req, res, next) {
  let userId = req.params.id;
  console.log("ClassName", req.body.className);
  insertClass(req.body.className)
    .then((data) => addtoUsersClasses(userId, data[0].id))
    .then((userClassRow) => getAllClasses())
    .then(classes => {
      res.render('dashboard', {
        title: `The individual user\'s dashboard ${req.params.id}`,
        classes
      });
    })

=======
router.post('/:id', verifyClassName, function(req,res,next){
  console.log("ClassName",req.body.className);
  insertClass(req.body.className)
    .then((data) =>{
      console.log(data);
      res.render('dashboard');
    })
>>>>>>> added button to instructor dashboard
})

function getClasses(req, res, next) {
  getUserClasses(req.params.id)
    .then(data => {
      console.log(data);
      next()
    })
}

function verifyToken(req, res, next) {
  jwt.verify(req.cookies.token, 'shhh', function(err, decoded) {
    console.log(Object.keys(decoded));
    if (decoded.id == req.params.id) {
      next()
    } else {
      res.clearCookie('token')
      res.redirect(`/login`)
    }

  });
}

<<<<<<< HEAD
function verifyClassName(req, res, next) {
  if (!req.body.className || !req.body.className.trim()) {
    next(boom.create(400, "no class name provided"));
  } else {
    next();
  }
}

const addtoUsersClasses = (userId, classID) => {
  return knex('users_classes')
    .returning('*')
    .insert({
      'class_id': classID,
      'user_id': userId
    });
}
const insertClass = (className) => knex('classes').returning('*').insert({
  'name': className
});
=======
function verifyClassName(req,res,next){
  if(!req.body.className|| !req.body.className.trim()){
    next(boom.create(400, "no class name provided"));
  }
  else{
    next();
  }
}
const addtoUsersClasses = (instructorID,classID)
const insertClass = (className) => knex('classes').returning('*').insert( { 'name': className } );
>>>>>>> added button to instructor dashboard
const getUserClasses = (id) => knex('users').where('id', id)
const getAllClasses = () => knex('classes')

module.exports = router;
ts = router;
