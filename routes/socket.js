module.exports = function(socket) {
  console.log('user connected!');

  socket.emit('init', { message: 'Hello World' });

  socket.on('user:joined', function(userName) {
    socket.broadcast.emit('user:joined', userName);
    console.log('user joined ' + userName);
  });

  socket.on('message:send', function(data) {
    socket.broadcast.emit('message:receive', data);
    console.log(data.text, data.author);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected!');
  });
};
