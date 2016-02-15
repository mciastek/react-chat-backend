var moment = require('moment');
var dateFormat = 'HH:mm:ss';

var isUserActive = false;
var allActiveUsers = [];

module.exports = function onConnect(socket) {
  var date = moment().format(dateFormat);
  var currentUser = null;

  console.log(date + ' | user connected!');

  socket.emit('init', { onlineUsers: allActiveUsers });

  socket.on('user:joined', function onUserJoined(userName) {
    var date = moment().format(dateFormat);

    currentUser = userName;
    isUserActive = true;

    if (allActiveUsers.indexOf(currentUser) === -1) {
      allActiveUsers.push(currentUser);
    }

    socket.broadcast.emit('user:joined', {
      userName: currentUser,
      onlineUsers: allActiveUsers
    });

    console.log(date + ' | user "' + currentUser + '" joined!');

  });

  socket.on('message:send', function onMessageSend(message) {
    var date = moment().format(dateFormat);
    socket.broadcast.emit('message:receive', message);

    console.log(date + ' | author: "' + message.author + '", text: "' + message.text + '".');
  });

  socket.on('disconnect', function onDisconnect() {
    var date = moment().format(dateFormat);

    isUserActive = false;

    setTimeout(function() {
      if (!isUserActive) {
        allActiveUsers = allActiveUsers.filter(function(userName) {
          return userName !== currentUser;
        });

        socket.broadcast.emit('user:left', {
          userName: currentUser,
          onlineUsers: allActiveUsers
        });

        console.log(date + ' | user "' + currentUser + '" left!');
      }
    }, 2000);

    console.log(date + ' | user disconnected!');
  });
};
