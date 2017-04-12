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

router.post('/', verifyClassName, function(req, res, next) {
  let userId = req.body.id;
  console.log("user id", req.body.id);
  console.log("ClassName", req.body.className);
  insertClass(req.body.className)
    .then((data) => {
      addtoUsersClasses(userId, data[0].id)
      .then(classes => {
        res.send({data:data[0]});
      })
    })

})

router.delete('/:id', verifyClassExists,function(req,res,next){
  removeClass(req.params.id)
    .then((data) =>{
      if(data){
        console.log('deletting table: ',data.id);
        res.send(true);
      }
      else{
        res.send(false);
      }
    })
});

function verifyClassName(req, res, next) {
  if (!req.body.className || !req.body.className.trim()) {
    next(boom.create(400, "no class name provided"));
  } else {
    next();
  }
}

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

const removeClass = (id) => knex('classes').del().where('id',id);
const searchClass = (id) => knex('classes').where('id', id).first()
module.exports = router;
