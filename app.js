const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const io = require('socket.io')();
// routes
const index = require('./routes/index');
const users = require('./routes/users');
const login = require('./routes/login');
const signup = require('./routes/signup');
const dashboard = require('./routes/dashboard');
const classroom = require('./routes/classroom');
const noclass = require('./routes/noclass');



function initClass(bigObject, classroomName) {
  if (!bigObject.hasOwnProperty(classroomName)) {
    bigObject[classroomName] = {
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
      },
      instructor: {
        name: '',
        inClassroom: true
      }
    }
  }
}


const app = express();
ioFunction(io);

function ioFunction(io) {

  let classesObject = {

  }

  io.on('connection', function(socket) {
    socket.emit('findRoom');
    // console.log("socket: ", socket.id, " has entered");
    // console.log("the client is in", socket.rooms);
    socket.on('disconnect', () => {
      // console.log(socket.isInstructor);
      if (socket.isInstructor == 'true') {
        classesObject[socket.currentRoom].instructor.inClassroom = false
        console.log(socket.currentRoom);
      }
      console.log("user disconnected");

    })

    socket.on('mood', data => {
      console.log('---------------------', classesObject[data.room]);
      let userObject = createUserObject(data)
      if (classesObject[data.room].instructor.inClassroom) {
        // console.log("the data", data);
        let classroom = classesObject[data.room]
        for (var mood in classroom) {
          if (mood != 'instructor') {
            for (var i = 0; i < classroom[mood].students.length; i++) {
              if (classroom[mood].students[i].id === userObject.id) {
                classroom[mood].students.splice(i, 1);
                // console.log("students in ", mood, " ", classroom[mood].students);
              }
            }
          }
        }
        classesObject[data.room][data.mood].students.push(userObject)
        io.to(data.room).emit('session object', classesObject[data.room])
      } else {
        io.to(data.room).emit('sendToast')
      }
    })


    socket.on('checkRoom', (data) => {
      // console.log('beginning of checkRoom --- keys:', Object.keys(classesObject));
      if (!classesObject.hasOwnProperty(data.currentRoom)) {
        // console.log('doesnt have property ---: isInstructor', typeof data.isInstructor);
        if (data.isInstructor == 'true') {
          socket.currentRoom = data.currentRoom
          socket.isInstructor = data.isInstructor;
          // console.log('is instructor --- data:', data);
          initClass(classesObject, data.currentRoom);
          socket.join(data.currentRoom, function() {
            // console.log('YOUOYOUOYYOYOYUOYUOY');
            // console.log("the socket is in the following rooms", socket.rooms);
            io.to(data.currentRoom).emit('session object', classesObject[data.currentRoom])
          });
        } else {
          socket.emit('toDashboard')
        }
      } else {
        socket.join(data.currentRoom, function() {
          if (data.isInstructor == 'true') {
            socket.isInstructor = data.isInstructor;
            socket.currentRoom = data.currentRoom
            classesObject[data.currentRoom].instructor.inClassroom = true
          }
          io.to(data.currentRoom).emit('session object', classesObject[data.currentRoom])

          console.log("the socket is in the following rooms", socket.rooms);

        })
      }

    })

  });
}
app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.io = io;
  next();
})
// route handling
app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/signup', signup);
app.use('/dashboard', dashboard);
app.use('/classroom', classroom);
app.use('/noclass', noclass);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function createUserObject(userData) {
  return {
    name: userData.firstName + ' ' + userData.lastName,
    id: userData.id
  }
}
module.exports = app;
