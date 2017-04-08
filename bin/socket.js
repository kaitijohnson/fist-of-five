const server = require('www');
var io = require('socket.io')(server)

io.on('connection', function(socket) {
  console.log(socket);
  console.log("someone entered");

  io.emit('chat message', "Someone entered the classroom!")

  socket.on('disconnect', () => {
    console.log("user disconnected");
  })

  socket.on('chat message', data => {
    console.log(data)
    io.emit('chat message', data)
  })
});
