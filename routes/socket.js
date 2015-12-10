module.exports = function(socket) {
  console.log('user connected!');

  socket.emit('init', { message: 'Hello World' });

  socket.on('message', function(message) {
    console.log(message);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected!');
  });
};
