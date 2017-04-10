var express = require('express');
var router = express.Router();

const boom = require('boom');
const knex = require('../knex');
const bcrypt = require('bcrypt');
const humps = require('humps');
const jwt = require('jsonwebtoken');

router.get('/:id', function(req, res, next) {
  console.log(router);
<<<<<<< HEAD
  ioFunction(req);
=======
  ioFunction()
>>>>>>> 321fae72162fa19961476abf87946029af8953e6
  res.render('sockettest', {
    title: req.params.id
  })
});

<<<<<<< HEAD
function ioFunction(req) {
=======
function ioFunction() {
>>>>>>> 321fae72162fa19961476abf87946029af8953e6
  let sessionObject = {
    happy: {
      value: 5,
      students: []
    },
    ya: {
      value: 4,
      students: []
    },
    meh: {
      value: 3,
      students: []
    },
    confused: {
      value: 2,
      students: []
    },
    angry: {
      value: 1,
      students: []
    }
  }

<<<<<<< HEAD
  req.io.on('connection', function(socket) {
=======
  app.io.on('connection', function(socket) {
>>>>>>> 321fae72162fa19961476abf87946029af8953e6
    console.log("someone entered");

    socket.on('disconnect', () => {
      console.log("user disconnected");
    })

    socket.on('mood', data => {
      sessionObject[data].students.push('student')
<<<<<<< HEAD
      req.io.emit('session object', sessionObject)
=======
      app.io.emit('session object', sessionObject)
>>>>>>> 321fae72162fa19961476abf87946029af8953e6
    })
  });
}

module.exports = router;
