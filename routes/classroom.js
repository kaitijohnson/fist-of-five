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

function ioFunction() {
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

  app.io.on('connection', function(socket) {
    console.log("someone entered");

    socket.on('disconnect', () => {
      console.log("user disconnected");
    })

    socket.on('mood', data => {
      sessionObject[data].students.push('student')
      app.io.emit('session object', sessionObject)
    })
  });
}

module.exports = router;
