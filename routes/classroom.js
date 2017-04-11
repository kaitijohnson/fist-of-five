var express = require('express');
var router = express.Router();

const boom = require('boom');
const knex = require('../knex');
const bcrypt = require('bcrypt');
const humps = require('humps');
const jwt = require('jsonwebtoken');

router.get('/:id', function(req, res, next) {
  console.log(router);
  // ioFunction(req);
  res.render('classroom', {
    title: req.params.id
  })
});

// function ioFunction(req) {
//   let sessionObject = {
//     happy: {
//       value: 5,
//       students: []
//     },
//     ya: {
//       value: 4,
//       students: []
//     },
//     meh: {
//       value: 3,
//       students: []
//     },
//     confused: {
//       value: 2,
//       students: []
//     },
//     angry: {
//       value: 1,
//       students: []
//     }
//   }
//
//   req.io.on('connection', function(socket) {
//     socket.join(`classroom_${req.params.id}`, () =>{
//       console.log("socket: ", socket.id, " has entered");
//       console.log("the client is in", socket.rooms);
//       socket.to(`classroom_${req.params.id}`).emit('message', `I am in the room ${req.params.id}`);
//     });
//
//     socket.on('disconnect', () => {
//       console.log("user disconnected");
//     })
//
//     socket.on('mood', data => {
//       sessionObject[data].students.push('student')
//       req.io.emit('session object', sessionObject)
//     })
//   });
// }


module.exports = router;
