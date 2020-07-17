$(document).ready(function () {
  const socket = io();

  $('form').submit(function () {
    var messageToSend = $('#m').val();
    socket.emit('chat message', messageToSend);
    $('#m').val('');
    return false;
  });

  socket.on('user', function (data) {
    $('#num-users').text(data.currentUsers + ' users online');
    var messageUserName = data.name;
    if (data.connected) {
      messageUserName += ' has joined the chat.';
    } else {
      messageUserName += ' has left the chat.';
    }
    $('#messages').append($('<li>').html('<b>' + messageUserName + '<\/b>'));
  });

  socket.on('messages', (data) => {
    $('#messages').append($('<li>').text(data.name + ': ' + data.message));
    // $('#messages').html((i, origText) => {
    //   return origText + '<li>' + data.name + ': ' + data.message + '</li>';
    // });
  })
});
