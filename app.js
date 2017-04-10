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

const app = express();
ioFunction(io);
function ioFunction(io) {
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

  io.on('connection', function(socket) {
    socket.emit('findRoom');
    console.log("socket: ", socket.id, " has entered");
    console.log("the client is in", socket.rooms);
    socket.on('disconnect', () => {
      console.log("user disconnected");
    })

    socket.on('mood', data => {
      sessionObject[data.mood].students.push('student')
      io.to(data.room).emit('session object', sessionObject)
    })

    socket.on('joinRoom', data=> {
      console.log('Request to join ', data);
      socket.join(data, function (){
        console.log("the socket is in the following rooms", socket.rooms);
      });
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

module.exports = app;
